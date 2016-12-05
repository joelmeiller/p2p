/* eslint-env mocha */

import { assert } from 'chai';

import mapMember from '../../../src/middleware/utils/mapMember.js';


describe('middleware/utils/mapRating', () => {
  it('sort with removed', () => {
    const apiRating = {
      id: 1,
      rating: 0,
      comment: 'Test Comment',
      member: {
        id: 2,
        student: {
          id: 11,
          firstName: 'Heidi',
          lastName: 'Von der Heide',
          email: 'heidi.vonderheide@students.fhnw.ch',
          type: 'BB',
          slug: 'heidi-vonderheide',
        },
        roles: [{
          id: 2,
          active: true,
          role: {
            id: 2,
            type: 'OTHER',
            title: 'Requirements Engineer',
            shortcut: 'RE',
          },
        }],
      },
      criteriaRatings: [{
        id: 1,
        rating: 0,
        criteria: {
          id: 5,
          label: 'My self-defined criteria',
        },
        category: {
          id: 3,
          title: 'Own Criterias',
          type: 'SELFDEFINED',
        },
      }, {
        id: 3,
        rating: 4.0,
        criteria: {
          id: 4,
          label: 'My other defined criteria',
        },
        category: {
          id: 3,
          title: 'Own Criterias',
          type: 'SELFDEFINED',
        },
      }, {
        id: 2,
        rating: 0,
        criteria: {
          id: 1,
          label: 'First Test Criteria',
        },
        category: {
          id: 1,
          title: 'First Test Category',
          type: 'PREDEFINED',
        },
      }],
    };

    const mappedMember = mapMember(apiRating.member);

    assert.equal(mappedMember.id, apiRating.member.id);
    assert.equal(mappedMember.studentId, apiRating.member.student.id);
    assert.equal(mappedMember.email, apiRating.member.student.email);
    assert.equal(mappedMember.firstName, apiRating.member.student.firstName);
    assert.equal(mappedMember.lastName, apiRating.member.student.lastName);
    assert.equal(mappedMember.name, 'Heidi Von der Heide');
    assert.equal(mappedMember.slug, apiRating.member.student.slug);
  });
});



