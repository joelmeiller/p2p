// Node imports
import 'isomorphic-fetch';


export const getMyRating = (project, callback) =>
  fetch('http://localhost:3000/p2p/api/myrating/test')
    .then(response => response.json())
    .then(data => callback(data));
