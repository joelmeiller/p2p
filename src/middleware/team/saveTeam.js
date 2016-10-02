// Node imports
import fetch from 'isomorphic-fetch';


export const saveTeam = (values, callback) => {
  fetch('http://localhost:3000/p2p/api/team/member/test', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  .then(response => callback(response));
};
