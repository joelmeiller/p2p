// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getUserAndProjectSettings as origin } from './getUserAndProjectSettings.js';


const data = {
  user: {
    fullName: 'Test Misteli',
    firstName: 'Test',
    lastName: 'Misteli',
    role: 'QM',
    isQM: true,
    isJury: false,
    isFinal: false, // <-- set to show my rating
  },
  project: {
    title: 'IP5: P2P Web App',
    deadlines: {
      criteria: '01.08.2016',
      rating: '12.10.2016',
    },
  },
};


export default (callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get(apiEntrypoint, data);

  origin(callback);

  // Unpatch.
  mock.restore();
};
