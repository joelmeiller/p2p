// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getCriteria as origin } from './getCriteria.js';

const data = {
  readonly: false,
  categories: [{
    id: '234234234',
    title: 'Konflikt Kompetenzen',
    criterias: [{
      id: '123123123',
      label: 'Weicht konflikten aus',
    }, {
      id: '123123124',
      label: 'Trägt Konflikte unparteiisch und kooperativ aus',
    }],
    selectCriterias: [{
      id: '123123126',
      label: 'Geht aktiv auf Konflikte zu',
    }, {
      id: '123123127',
      label: 'Handelt professionell',
    }],
  }, {
    id: '234234235',
    title: 'Team Kompetenzen',
    criterias: [{
      id: '123123125',
      label: 'Bringt sich selber ins Team ein',
    }],
    selectCriterias: [{
      id: '123123234',
      label: 'Kann ein Team führen',
    }, {
      id: '123123346',
      label: 'Unterstützt das Team proaktiv',
    }],
  }, {
    id: '234234236',
    title: 'Eigene Kriterien',
    criterias: [{
      id: '123123126',
      label: 'Ist neugierig & Interessiert',
      self: true,
    }],
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
