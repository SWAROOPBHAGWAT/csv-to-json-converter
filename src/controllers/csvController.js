// src/controllers/csvController.js
// Controller for handling CSV processing requests
const csvService = require('../services/csvService');
const fs = require('fs'); // Import fs for file validation

async function processCsvAndReport(req, res) {
  try {
    if (!req.file) {
      console.error('Error: No CSV file uploaded');
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    const filePath = req.file.path; // Get the path of the uploaded file

    // Validate file path
    if (!fs.existsSync(filePath)) {
      console.error(`Error: Uploaded file not found: ${filePath}`);
      return res.status(400).json({ error: 'Uploaded file not found' });
    }

    const users = await csvService.processCsv(filePath);
    const ageDistribution = await csvService.getAgeDistribution();

    console.log('Age Distribution Report:');
    console.log('-------------------------');
    ageDistribution.forEach(item => {
      console.log(`${item.age_group}: ${item.percentage}`);
    });
    console.log('-------------------------');

    // Send formatted JSON response in the desired format
    const formattedUsers = users.map(user => ({
      name: {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
      },
      age: user.age,
      address: user.address,
      gender: user.additional_info.gender,
    }));

    // Log the formatted JSON to the console
    console.log('Formatted JSON Data:');
    console.log(JSON.stringify(formattedUsers, null, 2));

    // Log successful operation
    console.log('CSV processing completed successfully.');

    res.json(formattedUsers);
  } catch (error) {
    console.error(`Error processing CSV: ${error.message}`, error); // Log more details
    res.status(500).json({ error: 'Internal server error' }); // Use generic error message
  }
}

module.exports = { processCsvAndReport };