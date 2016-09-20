// Node imports
import 'isomorphic-fetch';


export const getTeam = (project, callback) => 
  fetch('http://localhost:3000/p2p/api/team/test')
    .then(response => response.json())
    .then(data => callback(data));
