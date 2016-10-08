// Node imports
import mock from 'fetch-mock';

import { apiEntrypoint, getTeam as origin } from './getTeam.js';

const data = {
  members: [{
    id: '123324',
    name: 'Michelle Steiner',
    email: 'michelle.steiner@students.fhnw.ch',
    slug: 'michelle-steiner',
    isQM: false,
    roles: [{
      id: 'QM',
      title: 'Quality Manager',
      active: true,
    }],
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
    name: 'Rebekka Burri',
    email: 'rebekka.burri@students.fhnw.ch',
    self: true,
    slug: 'rebekka-burri',
    roles: [{
      id: 'SA',
      title: 'Software Architekt',
      active: true,
    }],
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
    name: 'Martin Muster',
    email: 'martin.muster@students.fhnw.ch',
    slug: 'martin-muster',
    roles: [{
      id: 'PL',
      title: 'Projektleiter',
      active: true,
    }],
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
    name: 'Bettina Rust',
    email: 'bettina.rust@students.fhnw.ch',
    slug: 'bettina-rust',
    roles: [{
      id: 'RE',
      title: 'Requirements Engineer',
      active: true,
    }],
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
  roles: [{
    id: 'IM',
    title: 'Information Manager',
  }, {
    id: 'QM',
    title: 'Quality Manager',
  }, {
    id: 'RE',
    title: 'Requirements Engineer',
  }, {
    id: 'SA',
    title: 'Software Architekt',
  }, {
    id: 'PL',
    title: 'Projektleiter',
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
