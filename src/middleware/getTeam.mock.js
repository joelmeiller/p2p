// Node imports
import mock from 'fetch-mock';

import { getTeam as origin } from './getTeam.js';

const data = {
  members: [{
    id: '123324',
    name: 'Max Muster',
    slug: 'max-muster',
    role: 'QM',
    progress: 45,
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        stars: 3,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        stars: 3,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        stars: 1,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        stars: 1,
      }],
    }],
    comment: 'Blabla',
  }, {
    id: '123325',
    name: 'Joel Meiller',
    slug: 'joel-meiller',
    role: 'TM',
    progress: 30,
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        stars: 2,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        stars: 2,
      }],
    }, {
      id: '2342342345',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        stars: 3,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        stars: 5,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }, {
    id: '123327',
    name: 'Andrey Michelle',
    slug: 'andrey-michelle',
    role: 'RE',
    progress: 90,
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        stars: 3,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        stars: 4,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        stars: 3,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        stars: 4,
      }],
    }],
    comment: '',
  }, {
    id: '123328',
    name: 'Hans Klein',
    slug: 'hans-klein',
    role: 'SA',
    progress: 50,
    categories: [{
      id: '234234234',
      title: 'Konflikt Kompetenzen',
      criterias: [{
        id: '123123123',
        label: 'Weicht konflikten aus',
        stars: 1,
      }, {
        id: '123123124',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        stars: 2,
      }],
    }, {
      id: '234234235',
      title: 'Team Kompetenzen',
      criterias: [{
        id: '123123125',
        label: 'Bringt sich selber ins Team ein',
        stars: 5,
      }],
    }, {
      id: '234234236',
      title: 'Eigene Kriterien',
      criterias: [{
        id: '123123126',
        label: 'Ist neugierig & Interessiert',
        stars: 5,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }],
};


export const getTeam = (project, callback) => {
  // Patch the fetch() global to always return the same value for GET
  // requests to all URLs.
  mock.get('*', data);

  origin(project, callback);

  // Unpatch.
  mock.restore();
};
