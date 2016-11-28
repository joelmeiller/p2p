// Select students depending on value
// Searches in name & email
import fetch from '../utils/fetch.js';

export default (pattern, callback) => {
  if (pattern && pattern > '') {
    fetch(`students/suggestions?pattern=${pattern}`)
    .then((data) => {
      // Map data
      const suggestions = data.map(student => ({
        ...student,
        id: student.id.toString(),
        name: `${student.firstName} ${student.lastName}`,
      })).slice(0, 7);

      // Return data
      callback(suggestions);
    });
  } else {
    callback([]);
  }
};
