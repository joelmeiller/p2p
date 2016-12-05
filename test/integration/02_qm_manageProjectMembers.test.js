/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/project/members`;

let members = undefined;

describe('manage project members', () => {
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
        members = data;
        done();
      });
    });
  });

  it('get members', () => {
    // Check members
    assert.isDefined(members);
    assert.equal(members.length, 2);

    // Member 'Heidi Von der Heide'
    let member = members[0];
    assert.equal(member.id, 2);
    assert.equal(member.student.firstName, 'Heidi');
    assert.equal(member.student.lastName, 'Von der Heide');
    assert.equal(member.student.email, 'heidi.vonderheide@students.fhnw.ch');
    assert.equal(member.student.type, 'STUDENT');
    assert.equal(member.student.studentType, 'BB');
    assert.equal(member.student.status, 'FREE');
    assert.equal(member.student.slug, 'heidi-vonderheide');
    assert.isNotTrue(member.student.coach);
    assert.isNotTrue(member.student.qm);
    assert.equal(member.ratings.length, 0);
    assert.equal(member.status, 'OPEN');

    // Member 'Max Muster'
    member = members[1];
    assert.equal(member.id, 1);
    assert.equal(member.student.firstName, 'Max');
    assert.equal(member.student.lastName, 'Muster');
    assert.equal(member.student.email, 'max.muster@students.fhnw.ch');
    assert.equal(member.student.type, 'STUDENT');
    assert.equal(member.student.studentType, 'BB');
    assert.equal(member.student.status, 'FREE');
    assert.equal(member.student.slug, 'max-muster');
    assert.isNotTrue(member.student.coach);
    assert.isTrue(member.student.qm);
    assert.equal(member.ratings.length, 0);
    assert.equal(member.status, 'NEW');
  });

  it('add new project members', () => {
    // TODO: add integration tests
  });

  it('change role of existing members', () => {
    // TODO: add integration tests
  });

  it('remove existing project members', () => {
    // TODO: add integration tests
  });
});
