// Select students depending on value
// Searches in name & email
// Node imports
import 'isomorphic-fetch';
import mock from 'fetch-mock';


export const apiEntrypoint = 'http://localhost:3000/p2p/api/students/suggestions';


// TODO: Replace with api backend call
const data = [{
  id: '44444324',
  name: 'Tester 1',
  email: 'michelle.steiner@students.fhnw.ch',
}, {
  id: '44444325',
  name: 'Hueber Max 34',
  email: 'michelle.steiner@students.fhnw.ch',
}, {
  id: '44444326',
  name: 'Bester Student',
  email: 'michelle.steiner@students.fhnw.ch',
}, {
  id: '44444327',
  name: 'Etwas komisches',
  email: 'michelle.steiner@students.fhnw.ch',
}];

export const getMembersSuggestions = (value, callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get(apiEntrypoint, data);

  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(suggestions => callback(suggestions));

  // Unpatch.
  mock.restore();
};
