/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/students/suggestions`;

let suggestions = undefined;

describe('load student suggestions', () => {
  describe('search for not existing students', () => {
    before((done) => {
      fetch(`${api}?pattern=xxx`, {
        headers: {
          'Content-Type': 'application/json',
          'mail': 'max.muster@students.fhnw.ch',
        },

      })
      .then((response) => {
        assert.isTrue(response.ok);
        response.json().then((data) => {
          suggestions = data;
          done();
        });
      });
    });

    it('no suggestions found', () => {
      // Check suggestions
      assert.isDefined(suggestions);
      assert.equal(suggestions.length, 0);
    });
  });

  describe('search for existing students', () => {
    before((done) => {
      fetch(`${api}?pattern=Test`, {
        headers: {
          'Content-Type': 'application/json',
          'mail': 'max.muster@students.fhnw.ch',
        },

      })
      .then((response) => {
        assert.isTrue(response.ok);
        response.json().then((data) => {
          suggestions = data;
          done();
        });
      });
    });

    it('suggestions found', () => {
      // Check suggestions
      assert.isDefined(suggestions);
      assert.equal(suggestions.length, 9);

      // Check first suggestion only (the rest is similar)
      const stud = suggestions[0];
      assert.equal(stud.id, 3);
      assert.equal(stud.firstName, 'Test');
      assert.equal(stud.lastName, 'Person-1');
      assert.equal(stud.email, 'test.person1@students.fhnw.ch');
      assert.equal(stud.type, 'STUDENT');
      assert.equal(stud.studentType, 'FULLTIME');
      assert.equal(stud.status, 'FREE');
      assert.equal(stud.slug, 'test-person1');
      assert.isNotTrue(stud.coach);
      assert.isNotTrue(stud.qm);
    });
  });
});
