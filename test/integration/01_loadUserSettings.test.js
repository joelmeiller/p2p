/* eslint-env mocha */

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/user/settings`;

describe('load user settings', () => {
  it('get user settings', (done) => {
    fetch(api, {
      headers: {
        'Content-Type': 'application/json',
        'mail': 'max.muster@students.fhnw.ch',
      },
    })
    .then((response) => {
      assert.isTrue(response.ok);
      response.json().then((data) => {
        console.log(data);
        assert.isDefined(data.user);
        done()
      });
    });
  });
});
