/* eslint-env mocha */

import { assert } from 'chai';

import calculateProgress from '../../../src/middleware/utils/calculateProgress.js';

describe('middleware/utils/calculateProgress', () => {
  it('empty', () => {
    assert.equal(calculateProgress({
      name: 'Test Person',
      categories: [],
    }), 0);

    assert.equal(calculateProgress({
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          label: '',
        }, {
          label: '',
        }, {
          label: '',
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          label: '',
        }, {
          label: '',
        }, {
          label: '',
        }],
      }, {
        title: 'Test 3',
        criteriaRatings: [],
      }],
      comment: '',
    }), 0);
  });

  it('all filled', () => {
    assert.equal(calculateProgress({
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }],
      }, {
        title: 'Test 3',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }],
      }],
      comment: 'Kommentar',
    }), 100);
  });

  it('partially filled (no comment)', () => {
    assert.equal(calculateProgress({
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }, {
          label: '',
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
        }, {
          label: '',
        }],
      }, {
        title: 'Test 3',
        criteriaRatings: [{
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }, {
          label: '',
          rating: 1,
        }],
      }],
    }), 60);
  });

  it('comment only', () => {
    assert.equal(calculateProgress({
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          label: '',
        }, {
          label: '',
        }, {
          label: '',
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          label: '',
        }, {
          label: '',
        }, {
          label: '',
        }],
      }, {
        title: 'Test 3',
        criteriaRatings: [{
          label: '',
        }, {
          label: '',
        }, {
          label: '',
        }],
      }],
      comment: 'Kommentar',
    }), 10);
  });
});
