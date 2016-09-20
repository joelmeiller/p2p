// Node imports
import mock from 'fetch-mock';

import { getTeam as origin } from './getTeam.js';

const data = {
  members: [{
    id: '123324',
    name: 'Max Muster',
    role: 'QM',
    progress: 45,
    criteriaBlocks: [{
      title: "Konflikt Kompetenzen",
      criterias: [{
        label: "Weicht konflikten aus",
        stars: 3,
      }, {
        label: "Trägt Konflikte unparteiisch und kooperativ aus",
        stars: 3,
      }],
    }, {
      title: "Team Kompetenzen",
      criterias: [{
        label: "Bringt sich selber ins Team ein",
        stars: 1,
      }],
    }, {
      title: "Eigene Kriterien",
      criterias: [{
        label: "Ist neugierig & Interessiert",
        stars: 1,
      }],
    }],
  }, {
    id: '123325',
    name: 'Joel Meiller',
    role: 'TM',
    progress: 30,
    criteriaBlocks: [{
      title: "Konflikt Kompetenzen",
      criterias: [{
        label: "Weicht konflikten aus",
        stars: 2,
      }, {
        label: "Trägt Konflikte unparteiisch und kooperativ aus",
        stars: 2,
      }],
    }, {
      title: "Team Kompetenzen",
      criterias: [{
        label: "Bringt sich selber ins Team ein",
        stars: 3,
      }],
    }, {
      title: "Eigene Kriterien",
      criterias: [{
        label: "Ist neugierig & Interessiert",
        stars: 5,
      }],
    }],
    comment: 'Könnte sich mehr anstrengen. Aber alles in allem gut gemacht.',
  }, {
    id: '123327',
    name: 'Andrey Michelle',
    role: 'RE',
    progress: 90,
    criteriaBlocks: [{
      title: "Konflikt Kompetenzen",
      criterias: [{
        label: "Weicht konflikten aus",
        stars: 3,
      }, {
        label: "Trägt Konflikte unparteiisch und kooperativ aus",
        stars: 4,
      }],
    }, {
      title: "Team Kompetenzen",
      criterias: [{
        label: "Bringt sich selber ins Team ein",
        stars: 3,
      }],
    }, {
      title: "Eigene Kriterien",
      criterias: [{
        label: "Ist neugierig & Interessiert",
        stars: 4,
      }],
    }],
  }, {
    id: '123328',
    name: 'Hans Klein',
    role: 'SA',
    progress: 50,
    criteriaBlocks: [{
      title: "Konflikt Kompetenzen",
      criterias: [{
        label: "Weicht konflikten aus",
        stars: 1,
      }, {
        label: "Trägt Konflikte unparteiisch und kooperativ aus",
        stars: 2,
      }],
    }, {
      title: "Team Kompetenzen",
      criterias: [{
        label: "Bringt sich selber ins Team ein",
        stars: 5,
      }],
    }, {
      title: "Eigene Kriterien",
      criterias: [{
        label: "Ist neugierig & Interessiert",
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
}


