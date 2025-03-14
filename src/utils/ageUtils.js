/**
 * Calculates the age distribution of users.
 *
 * @param {Array<{age: number}>} users - An array of user objects with an age property.
 * @returns {Object<string, string>} - An object representing the age distribution,
 * or an empty object if there are no valid users.
 */
function calculateAgeDistribution(users) {
    if (!Array.isArray(users) || users.length === 0) {
      console.warn('Warning: Invalid or empty users array.');
      return {}; // Return an empty object for invalid input
    }
  
    const ageGroups = {
      '< 20': 0,
      '20 to 40': 0,
      '40 to 60': 0,
      '> 60': 0,
    };
  
    for (const user of users) {
      if (typeof user.age !== 'number' || isNaN(user.age)) {
        console.warn(`Warning: Invalid age value: ${user.age}. Skipping user.`);
        continue; // Skip to the next user
      }
  
      if (user.age < 20) {
        ageGroups['< 20']++;
      } else if (user.age >= 20 && user.age <= 40) {
        ageGroups['20 to 40']++;
      } else if (user.age > 40 && user.age <= 60) {
        ageGroups['40 to 60']++;
      } else {
        ageGroups['> 60']++;
      }
    }
  
    const totalUsers = Object.values(ageGroups).reduce((sum, count) => sum + count, 0);
  
    if (totalUsers === 0) {
      return {
        '< 20': '0.00',
        '20 to 40': '0.00',
        '40 to 60': '0.00',
        '> 60': '0.00',
      };
    }
  
    const distribution = {};
    for (const group in ageGroups) {
      distribution[group] = ((ageGroups[group] / totalUsers) * 100).toFixed(2);
    }
  
    return distribution;
  }
  
  module.exports = { calculateAgeDistribution };