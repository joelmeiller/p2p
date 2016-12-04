/* eslint-env mocha */

import { assert } from 'chai';

import getCriteriaValues from '../../../src/actions/utils/getCriteriaValues.js';


describe('actions/utils/getCriteriaValues', () => {
  it('empty', () => {
    let doc = {
      name: 'Test Person',
      categories: [],
    };
    let categories = getCriteriaValues(doc, { ratings: [] });
    assert.equal(categories.length, 0);

    doc = {
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          id: '12345',
          label: '',
        }, {
          id: '12346',
          label: '',
        }, {
          id: '12347',
          label: '',
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          id: '12348',
          label: '',
        }, {
          id: '12349',
          label: '',
        }, {
          id: '12350',
          label: '',
        }],
      }, {
        title: 'Test 3',
        criteriaRatings: [],
      }],
      comment: '',
    };

    categories = getCriteriaValues(doc, { ratings: [] });
    assert.equal(categories.length, doc.categories.length);
    categories.forEach((cat, i) => {
      assert.equal(cat.criteriaRatings.length, doc.categories[i].criteriaRatings.length);
      cat.criteriaRatings.forEach((crit, j) => {
        assert.equal(crit.rating, doc.categories[i].criteriaRatings[j].length);
      });
    });
  });

  it('all changed', () => {
    const doc = {
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          id: '12345',
          label: '',
          rating: 2,
        }, {
          id: '12346',
          label: '',
          rating: 2,
        }, {
          id: '12347',
          label: '',
          rating: 2,
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          id: '12348',
          label: '',
          rating: 2,
        }, {
          id: '12349',
          label: '',
          rating: 2,
        }, {
          id: '12350',
          label: '',
          rating: 2,
        }],
      }],
    };

    const values = {
      ratings: [{
        id: '12345',
        rating: 3,
      }, {
        id: '12346',
        rating: 3,
      }, {
        id: '12347',
        rating: 3,
      }, {
        id: '12348',
        rating: 3,
      }, {
        id: '12349',
        rating: 3,
      }, {
        id: '12350',
        rating: 3,
      }],
    };

    const categories = getCriteriaValues(doc, values);
    assert.equal(categories.length, doc.categories.length);
    categories.forEach((cat, i) => {
      assert.equal(cat.criteriaRatings.length, doc.categories[i].criteriaRatings.length);
      cat.criteriaRatings.forEach((crit) => {
        const value = values.ratings.find(r => r.id === crit.id);
        assert.isDefined(value);
        assert.equal(crit.rating, value.rating);
      });
    });
  });

  it('partially changed existing', () => {
    const doc = {
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          id: '12345',
          label: '',
          rating: 2,
        }, {
          id: '12346',
          label: '',
          rating: 2,
        }, {
          id: '12347',
          label: '',
          rating: 2,
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          id: '12348',
          label: '',
          rating: 2,
        }, {
          id: '12349',
          label: '',
          rating: 2,
        }, {
          id: '12350',
          label: '',
          rating: 2,
        }],
      }],
    };

    const values = {
      ratings: [{
        id: '12345',
        rating: 3,
      }, {
        id: '12347',
        rating: 3,
      }, {
        id: '12350',
        rating: 3,
      }],
    };

    const categories = getCriteriaValues(doc, values);
    assert.equal(categories.length, doc.categories.length);
    categories.forEach((cat, i) => {
      assert.equal(cat.criteriaRatings.length, doc.categories[i].criteriaRatings.length);
      cat.criteriaRatings.forEach((crit, j) => {
        const value = values.ratings.find(r => r.id === crit.id);
        if (value) {
          assert.isDefined(value);
          assert.equal(crit.rating, value.rating);
        } else {
          assert.equal(crit.rating, doc.categories[i].criteriaRatings[j].rating);
        }
      });
    });
  });

  it('partially changed new', () => {
    const doc = {
      name: 'Test Person',
      categories: [{
        title: 'Test 1',
        criteriaRatings: [{
          id: '12345',
          label: '',
          rating: 2,
        }, {
          id: '12346',
          label: '',
        }, {
          id: '12347',
          label: '',
        }],
      }, {
        title: 'Test 2',
        criteriaRatings: [{
          id: '12348',
          label: '',
          rating: 2,
        }, {
          id: '12349',
          label: '',
        }, {
          id: '12350',
          label: '',
        }],
      }],
    };

    const values = {
      ratings: [{
        id: '12346',
        rating: 3,
      }, {
        id: '12347',
        rating: 3,
      }, {
        id: '12350',
        rating: 3,
      }],
    };

    const categories = getCriteriaValues(doc, values);
    assert.equal(categories.length, doc.categories.length);
    categories.forEach((cat, i) => {
      assert.equal(cat.criteriaRatings.length, doc.categories[i].criteriaRatings.length);
      cat.criteriaRatings.forEach((crit, j) => {
        const value = values.ratings.find(r => r.id === crit.id);

        if (value) {
          assert.isDefined(value);
          assert.equal(crit.rating, value.rating);
        } else {
          assert.equal(crit.rating, doc.categories[i].criteriaRatings[j].rating);
        }
      });
    });
  });
});
