/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/roles`;

let roles = undefined;

describe('load roles', () => {
  before((done) => {
    fetch(`${api}/active`, {
      headers: {
        'Content-Type': 'application/json',
        'mail': 'max.muster@students.fhnw.ch',
      },
    })
    .then((response) => {
      assert.isTrue(response.ok);
      response.json().then((data) => {
        roles = data;
        done();
      });
    });
  });

  it('get active roles', () => {
    // Check roles
    assert.isDefined(roles);
    assert.equal(roles.length, 5);

    let role = roles[0];
    assert.equal(role.id, 1);
    assert.equal(role.type, 'QM');
    assert.equal(role.title, 'Quality Manager');
    assert.equal(role.shortcut, 'QM');

    role = roles[1];
    assert.equal(role.id, 2);
    assert.equal(role.type, 'OTHER');
    assert.equal(role.title, 'Requirements Engineer');
    assert.equal(role.shortcut, 'RE');

    role = roles[2];
    assert.equal(role.id, 3);
    assert.equal(role.type, 'OTHER');
    assert.equal(role.title, 'Software Architekt');
    assert.equal(role.shortcut, 'SA');

    role = roles[3];
    assert.equal(role.id, 4);
    assert.equal(role.type, 'OTHER');
    assert.equal(role.title, 'Projektleiter');
    assert.equal(role.shortcut, 'PL');

    role = roles[4];
    assert.equal(role.id, 5);
    assert.equal(role.type, 'OTHER');
    assert.equal(role.title, 'Test Manager');
    assert.equal(role.shortcut, 'TM');
  });

  it('add new role', () => {
    // TODO: add integration tests
  });

  it('change existing role', () => {
    // TODO: add integration tests
  });

  it('remove existing role', () => {
    // TODO: add integration tests
  });
});
