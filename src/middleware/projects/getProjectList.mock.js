// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getProjects as origin } from './getProjectList.js';

const data = {
  projects: [
    {
      id: '12345',
      level: 'IP3',
      start: 'FS16',
      zeitmodell: '',
      title: 'Technology Chooser',
      slug: 'technology-chooser',
      lastUpdateTSD: new Date(),
      status: 'complete',
      coach: 'Markus Oehninger',
    }, {
      id: '12346',
      level: 'IP4',
      start: 'FS16',
      zeitmodell: 'BB',
      title: 'Switch Server Anbindung',
      slug: 'switch-server',
      lastUpdateTSD: new Date(),
      status: 'pending',
      coach: 'Stefan Vetter',
    }, {
      id: '12347',
      level: 'IP4',
      start: 'FS16',
      zeitmodell: '',
      title: 'Evento API Erweiterung',
      slug: 'evento-api',
      lastUpdateTSD: new Date(),
      status: 'pending',
      coach: 'Christoph Denzler',
    }, {
      id: '12348',
      level: 'IP3',
      start: 'FS16',
      zeitmodell: '',
      title: 'Wasserspar App',
      slug: 'water-saving-app',
      lastUpdateTSD: new Date(),
      status: 'overdue',
      statusWarning: true,
      coach: 'Markus Oehninger',
    },
  ],
};


export default (callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get(apiEntrypoint, data);

  origin(callback);

  // Unpatch.
  mock.restore();
};
