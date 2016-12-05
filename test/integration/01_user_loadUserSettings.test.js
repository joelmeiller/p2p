/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/user/settings`;

let settings = undefined;

describe('load user settings', () => {
  before((done) => {
    fetch(api, {
      headers: {
        'Content-Type': 'application/json',
        'mail': 'max.muster@students.fhnw.ch',
      },
    })
    .then((response) => {
      assert.isTrue(response.ok);
      response.json().then((data) => {
        settings = data;
        done();
      });
    });
  });

  it('get user settings', () => {
    // Check user
    assert.isDefined(settings.user);
    assert.equal(settings.user.id, 1);
    assert.equal(settings.user.firstName, 'Max');
    assert.equal(settings.user.lastName, 'Muster');
    assert.equal(settings.user.email, 'max.muster@students.fhnw.ch');
    assert.equal(settings.user.type, 'STUDENT');
    assert.equal(settings.user.studentType, 'BB');
    assert.equal(settings.user.status, 'FREE');
    assert.equal(settings.user.slug, 'max-muster');
    assert.isNotTrue(settings.user.coach);
    assert.isTrue(settings.user.qm);

    // Check project
    assert.isDefined(settings.project);
    assert.equal(settings.project.id, 1);
    assert.equal(settings.project.title, 'Test Project');
    assert.equal(settings.project.status, 'OPEN');
    assert.equal(settings.project.grade, 4);

    // Check role
    assert.isDefined(settings.role)
    assert.equal(settings.role.id, 1);
    assert.equal(settings.role.type, 'QM');
    assert.equal(settings.role.title, 'Quality Manager');
    assert.equal(settings.role.shortcut, 'QM');

    // Check rating status
    assert.isDefined(settings.ratingState);
    assert.isNotTrue(settings.ratingState.final);
    assert.isNotTrue(settings.ratingState.open);
    assert.isNotTrue(settings.ratingState.accepted);
  });
});
