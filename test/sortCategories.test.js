/* eslint-env mocha */

import { assert } from 'chai';

import sortCategories from '../src/ui/utils/sortCategories.js';


describe('ui/utils/sortCategories', () => {
  it('sort with isSelfDefined', () => {
    const categories = [{
      isSelfDefined: true,
      title: 'zzz',
    }, {
      isSelfDefined: false,
      title: 'abc',
    }, {
      isSelfDefined: true,
      title: 'abc',
    }, {
      isSelfDefined: false,
      title: 'xyz',
    }, {
      isSelfDefined: false,
      title: 'abc',
    }, {
      isSelfDefined: false,
      title: 'efg',
    }];

    const sortedCategories = categories.sort(sortCategories);

    console.log(sortedCategories);

    assert.equal(sortedCategories[0].title, 'abc');
    assert.isFalse(sortedCategories[0].isSelfDefined);
    assert.equal(sortedCategories[1].title, 'xyz');
    assert.equal(sortedCategories[2].title, 'abc');
    assert.equal(sortedCategories[3].title, 'efg');
    assert.equal(sortedCategories[4].title, 'zzz');
    assert.isTrue(sortedCategories[4].isSelfDefined);
    assert.equal(sortedCategories[5].title, 'abc');
  });
});
