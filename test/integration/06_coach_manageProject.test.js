/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/projects`;

let project = undefined;

describe('manage project', () => {
  before((done) => {
    fetch(`${api}/1`, {
      headers: {
        'Content-Type': 'application/json',
        'mail': 'vladimir.petkovic@fhnw.ch',
      },
    })
    .then((response) => {
      assert.isTrue(response.ok);
      response.json().then((data) => {
        project = data;
        done();
      });
    });
  });

  it('get project (id=1)', () => {
    assert.equal(project.id, 1);
    assert.equal(project.title, 'Test Project');
    assert.equal(project.status, 'OPEN');
    assert.equal(project.zeitmodell, 'BB');
    assert.isDefined(project.start);
    assert.isUndefined(project.end);
    assert.equal(project.grade, 4);
    assert.equal(project.projectCategories.length, 0);
    assert.equal(project.members.length, 0);
    assert.equal(project.projectCriteria.length, 0);
  });
});
