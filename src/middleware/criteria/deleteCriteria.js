// Node imports
import fetch from 'isomorphic-fetch';


export const deleteCriteria = (criteriaId, callback) => {
  fetch('http://localhost:3000/p2p/api/team/member/test', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(criteria),
  })
  .then(response => callback(response));
};
