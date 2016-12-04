/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

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

        // Check user
        assert.isDefined(data.user);
        assert.equal(data.user.id, 1);
        assert.equal(data.user.firstName, 'Max');
        assert.equal(data.user.lastName, 'Muster');
        assert.equal(data.user.email, 'max.muster@students.fhnw.ch');
        assert.equal(data.user.type, 'STUDENT');
        assert.equal(data.user.studentType, 'BB');
        assert.equal(data.user.status, 'FREE');
        assert.equal(data.user.slug, 'max-muster');
        assert.isNotTrue(data.user.coach),
        assert.isTrue(data.user.qm),

        // Check project
        assert.isDefined(data.project);
        assert.equal(data.project.id, 1);
        assert.equal(data.project.title, 'Test Project');
        assert.equal(data.project.status, 'OPEN');
        assert.equal(data.project.grade, 4);

        // Check role
        assert.isDefined(data.role)
        assert.equal(data.role.id, 1);
        assert.equal(data.role.type, 'QM');
        assert.equal(data.role.title, 'Quality Manager');
        assert.equal(data.role.shortcut, 'QM');

        // Check rating status
        assert.isDefined(data.ratingState);
        assert.isNotTrue(data.ratingState.final);
        assert.isNotTrue(data.ratingState.open);
        assert.isNotTrue(data.ratingState.accepted);

        done()
      });
    });
  });
});
