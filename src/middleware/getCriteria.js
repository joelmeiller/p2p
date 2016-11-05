// Node imports

export const apiEntrypoint = 'http://localhost:8080/api/project/criterias';

export const getCriteria = callback =>
  fetch(apiEntrypoint)
    .then(response => response.json())
    .then(data => callback(data));
