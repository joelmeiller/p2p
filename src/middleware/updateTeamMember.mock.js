// Node imports
import mock from 'fetch-mock';

import { updateTeamMember as origin } from './updateTeamMember.js';

export const response = {
  status: 'OK',
  message: 'Joel Meiller updated',
};


export const updateTeamMember = (project, member, callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get('http://localhost:3000/p2p/api/team/member/test', response);

  console.log(JSON.stringify(member));

  origin(project, member, callback);

  // Unpatch.
  mock.restore();
};
