/* eslint-env mocha */

import { assert } from 'chai';

import getMemberRatings from '../src/actions/utils/getMemberRatings.js';


describe('actions/utils/getMemberRatings', () => {
  it('calculate member ratings', () => {
    const members = [{
      id: 2,
      studentId: 22,
      email: 'heidi.vonderheide@students.fhnw.ch',
      ratings: [{
        ratingId: 123,
        rating: 0,
        id: 2,
        studentId: 22,
        categories: [{
          id: 22,
          criteriaRatings: [{
            criteriaId: 333,
            id: 3343,
            rating: 3.0,
          }, {
            criteriaId: 444,
            id: 4453,
            rating: 3.0,
          }],
        }, {
          id: 44,
          criteriaRatings: [{
            criteriaId: 555,
            id: 5543,
            rating: 4.0,
          }, {
            criteriaId: 666,
            id: 6653,
            rating: 2.0,
          }],
        }],
      }, {
        ratingId: 345,
        rating: 0,
        id: 3,
        studentId: 33,
        categories: [{
          id: 22,
          criteriaRatings: [{
            criteriaId: 333,
            id: 3342,
            rating: 3.0,
          }, {
            criteriaId: 444,
            id: 4452,
            rating: 2.0,
          }],
        }, {
          id: 44,
          criteriaRatings: [{
            criteriaId: 555,
            id: 5542,
            rating: 4.0,
          }, {
            criteriaId: 666,
            id: 6652,
            rating: 2.0,
          }],
        }],
      }],
    }, {
      id: 3,
      studentId: 33,
      email: 'max.muster@students.fhnw.ch',
      ratings: [{
        ratingId: 567,
        rating: 0,
        id: 2,
        studentId: 22,
        categories: [{
          id: 22,
          criteriaRatings: [{
            criteriaId: 333,
            id: 334,
            rating: 3.0,
          }, {
            criteriaId: 444,
            id: 445,
            rating: 4.0,
          }],
        }, {
          id: 44,
          criteriaRatings: [{
            criteriaId: 555,
            id: 554,
            rating: 4.0,
          }, {
            criteriaId: 666,
            id: 665,
            rating: 2.0,
          }],
        }],
      }, {
        ratingId: 678,
        rating: 0,
        id: 3,
        studentId: 33,
        categories: [{
          id: 22,
          criteriaRatings: [{
            criteriaId: 333,
            id: 3341,
            rating: 3.0,
          }, {
            criteriaId: 444,
            id: 4451,
            rating: 4.0,
          }],
        }, {
          id: 44,
          criteriaRatings: [{
            criteriaId: 555,
            id: 5541,
            rating: 4.0,
          }, {
            criteriaId: 666,
            id: 6651,
            rating: 2.0,
          }],
        }],
      }],
    }];

    const memberRatings = getMemberRatings(members);

    assert.equal(memberRatings.length, 2);
    assert.equal(memberRatings[0].categories.length, 2);
    const ratings = memberRatings[0].categories[0].criteriaRatings;
    assert.equal(ratings.length, 2);
    assert.equal(ratings[0].criteriaId, 333);
    assert.equal(ratings[0].rating, 3);
    assert.equal(ratings[1].criteriaId, 444);
    assert.equal(ratings[1].rating, 3.25);
  });
});



