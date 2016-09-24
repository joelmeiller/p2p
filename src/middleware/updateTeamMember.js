// Node imports
import 'isomorphic-fetch';


export const updateTeamMember = (project, member, callback) => {
  fetch('http://localhost:3000/p2p/api/team/member/test', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(member),
  })
  .then(response => callback(response));
};
