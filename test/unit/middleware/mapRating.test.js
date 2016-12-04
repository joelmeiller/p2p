/* eslint-env mocha */

import { assert } from 'chai';

import mapRating from '../../../src/middleware/utils/mapRating.js';


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

    const mappedRating = mapRating(apiRating);

    assert.equal(mappedRating.ratingId, apiRating.id);
    assert.equal(mappedRating.rating, apiRating.rating);
    assert.equal(mappedRating.comment, apiRating.comment);
    assert.equal(mappedRating.id, apiRating.member.id);

    assert.isDefined(mappedRating.categories);
    assert.equal(mappedRating.categories.length, 2);
    assert.isDefined(mappedRating.categories[0].criteriaRatings);
    assert.equal(mappedRating.categories[0].criteriaRatings.length, 1);
    assert.equal(mappedRating.categories[1].criteriaRatings.length, 2);

    let category = mappedRating.categories[0];
    assert.equal(category.id, 1);
    assert.equal(category.type, 'PREDEFINED');
    assert.equal(category.criteriaRatings[0].id, 2);

    category = mappedRating.categories[1];
    assert.equal(category.id, 3);
    assert.equal(category.type, 'SELFDEFINED');
    assert.equal(category.criteriaRatings[0].id, 1);
    assert.equal(category.criteriaRatings[1].id, 3);
  });
});



