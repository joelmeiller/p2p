// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getTeam as origin } from './getTeam.js';

const data = {
  members: [{
    id: '123324',
    name: 'Max Muster',
    slug: 'max-muster',
    role: 'QM',
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        rating: 3,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        rating: 1,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
      }],
    }],
    comment: 'Blabla',
  }, {
    id: '123325',
    name: 'Joel Meiller',
    slug: 'joel-meiller',
    role: 'TM',
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        rating: 2,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        rating: 2,
      }],
    }, {
      id: '2342342345',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        rating: 3,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }, {
    id: '123327',
    name: 'Andrey Michelle',
    slug: 'andrey-michelle',
    role: 'RE',
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        rating: 3,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        rating: 4,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        rating: 3,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        rating: 4,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }, {
    id: '123328',
    name: 'Hans Klein',
    slug: 'hans-klein',
    role: 'SA',
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
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
      }],
    }],
    comment: '',
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
