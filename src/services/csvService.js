// src/services/csvService.js
// Service for processing CSV data and interacting with the database
const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db');
const { calculateAgeDistribution } = require('../utils/ageUtils');

async function processCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const users = await insertUsers(results);
          resolve(users);
        } catch (error) {
          reject(error);
        }
      });
  });
}

async function insertUsers(data) {
  const users = [];

  for (const row of data) {
    const { first_name: firstName, last_name: lastName, age, ...rest } = row;

    const address = {};
    const additionalInfo = {};

    for (const key in rest) {
      if (key.startsWith('address_')) {
        const addressKey = key.replace('address_', '');
        address[addressKey] = rest[key];
      } else {
        additionalInfo[key] = rest[key];
      }
    }

    const ageInt = parseInt(age);

    if (isNaN(ageInt)) {
      console.error(`Error: Invalid age value: ${age}`);
      continue; // Skip to the next row
    }

    const name = `${firstName} ${lastName}`;

    const query = `
      INSERT INTO users ("name", age, address, additional_info)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [name, ageInt, address, additionalInfo];

    try {
      const result = await pool.query(query, values);
      users.push(result.rows[0]);
    } catch (error) {
      console.error(`Error inserting user: ${error.message}`, error);
    }
  }

  return users;
}

async function getAgeDistribution() {
    try {
      const result = await pool.query(`
        SELECT
          CASE
            WHEN age < 20 THEN '< 20'
            WHEN age BETWEEN 20 AND 39 THEN '20 to 40'
            WHEN age BETWEEN 40 AND 59 THEN '40 to 60'
            ELSE '> 60'
          END AS age_group,
          COUNT(*) AS count
        FROM users
        GROUP BY age_group
        ORDER BY age_group;
      `);
  
      const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
      const total = parseInt(totalUsers.rows[0].count);
  
      const distribution = result.rows.map(row => ({
        age_group: row.age_group,
        percentage: ((row.count / total) * 100).toFixed(2) + '%'
      }));
  
      return distribution;
    } catch (error) {
      console.error(`Error getting age distribution: ${error.message}`, error);
      return []; // Return an empty array in case of error
    }
  }
  
  module.exports = { processCsv, getAgeDistribution };