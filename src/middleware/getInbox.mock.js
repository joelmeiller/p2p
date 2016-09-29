// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getInbox as origin } from './getInbox.js';

const data = {
  actions: [{
    id: '123',
    message: 'Welcome',
    type: 'info',
    date: new Date(),
    actionText: 'Okay',
  }, {
    id: '124',
    message: 'Die Kriterien wurden freigegeben. Du kannst ab sofort die Bewertungen für deine Teammitglieder erfassen.',
    type: 'info',
    date: new Date(),
    actionText: 'Okay',
  }],
};


export default (callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get(apiEntrypoint, data);

  origin(callback);

  // Unpatch.
  mock.restore();
};
