// Select students depending on value
// Searches in name & email
// Node imports
import 'isomorphic-fetch';


const apiEntrypoint = 'http://localhost:8080/api/students/suggestions';


export default (pattern, callback) => {
  if (pattern && pattern > '') {
    const url = `${apiEntrypoint}?pattern=${pattern}`;

    fetch(url)
    .then(response => response.json())
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
