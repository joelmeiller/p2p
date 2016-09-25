// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getTeam as origin } from './getTeam.js';

const data = {
  baseMark: 5.0,
  canSubmit: false,
  members: [{
    id: '123324',
    name: 'Max Muster',
    slug: 'max-muster',
    role: 'QM',
    rating: 2.9,
    deviation: -0.1,
    grade: 4.9,
    status: 'accepted',
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
        rating: 1,
      }],
    }],
    comment: 'Blabla',
  }, {
    id: '123325',
    name: 'Joel Meiller',
    slug: 'joel-meiller',
    role: 'TM',
    rating: 3.3,
    deviation: 0.2,
    grade: 5.2,
    status: 'accepted',
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
        rating: 5,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }, {
    id: '123327',
    name: 'Andrey Michelle',
    slug: 'andrey-michelle',
    role: 'RE',
    rating: 1,
    deviation: -2.0,
    deviationWarning: true,
    grade: 3,
    status: 'accepted',
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
    comment: '',
  }, {
    id: '123328',
    name: 'Hans Klein',
    slug: 'hans-klein',
    role: 'SA',
    rating: 4.5,
    deviation: 1.0,
    grade: 5.9,
    status: 'pending',
    statusWarning: true,
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        rating: 1,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        rating: 2,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        rating: 5,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        rating: 5,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
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
