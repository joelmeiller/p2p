/* eslint-env mocha */

import { assert } from 'chai';

import sortMembers from '../src/ui/utils/sortMembers.js';


describe('ui/utils/sortMembers', () => {
  it('sort with removed', () => {
    const members = [{
      removed: true,
      email: 'abc@test.ch',
      firstName: 'zzz',
    }, {
      removed: false,
      email: 'efg@test.ch',
      firstName: 'abc',
    }, {
      removed: true,
      email: 'xyz@test.ch',
      firstName: 'abc',
    }, {
      removed: false,
      email: 'abc@test.ch',
      firstName: 'xyz',
    }, {
      removed: false,
      email: 'hij@test.ch',
      firstName: 'abc',
    }, {
      removed: false,
      email: 'hijk@test.ch',
      firstName: 'efg',
    }];

    const sortedMembers = members.sort(sortMembers);

    console.log(sortedMembers);

    assert.equal(sortedMembers[0].email, 'abc@test.ch');
    assert.isFalse(sortedMembers[0].removed);
    assert.equal(sortedMembers[1].email, 'efg@test.ch');
    assert.equal(sortedMembers[2].email, 'hij@test.ch');
    assert.equal(sortedMembers[3].email, 'hijk@test.ch');
    assert.equal(sortedMembers[4].email, 'abc@test.ch');
    assert.isTrue(sortedMembers[4].removed);
    assert.equal(sortedMembers[5].email, 'xyz@test.ch');
  });
});
