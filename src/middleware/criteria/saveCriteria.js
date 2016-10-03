// Node imports
import fetch from 'isomorphic-fetch';


export const saveCriteria = (value, criteriaId, callback) => {
  fetch('http://localhost:3000/p2p/api/team/member/test', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value, criteriaId }),
  })
  .then(response => callback(response));
};
