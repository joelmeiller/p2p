// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('user/settings');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then(data => callback({
    user: {
      id: data.user.id.toString(),
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      fullName: `${data.user.firstName} ${data.user.lastName}`,
      role: data.role ? data.role.shortcut : '-',
      isQM: data.user.qm,
      isCoach: data.user.coach,
    },
    rating: data.rating ? {
      isFinal: data.rating.final,
      isAccepted: data.rating.accepted,
    } : {},
    project: data.project ? {
      ...data.project,
    } : {},
  }));
