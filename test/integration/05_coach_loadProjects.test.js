/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/projects`;

let projects = undefined;

describe('manage projects', () => {
  before((done) => {
    fetch(api, {
      headers: {
        'Content-Type': 'application/json',
        'mail': 'vladimir.petkovic@fhnw.ch',
      },
    })
    .then((response) => {
      assert.isTrue(response.ok);
      response.json().then((data) => {
        projects = data;
        done();
      });
    });
  });

  it('get single project', () => {
    // Check projects
    assert.isDefined(projects);
    assert.equal(projects.length, 3);

    // Member 'Heidi Von der Heide'
    let project = projects[0];
    assert.equal(project.id, 1);
    assert.equal(project.title, 'Test Project');
    assert.equal(project.status, 'OPEN');
    assert.isDefined(project.start);
    assert.equal(project.grade, 4);
    assert.equal(project.projectCategories.length, 0);
    assert.equal(project.members.length, 0);
    assert.equal(project.projectCriteria.length, 0);

    project = projects[1];
    assert.equal(project.id, 2);
    assert.equal(project.title, 'Test Project 1');
    assert.equal(project.status, 'OPEN');
    assert.isDefined(project.start);
    assert.equal(project.grade, 4);
    assert.equal(project.projectCategories.length, 0);
    assert.equal(project.members.length, 0);
    assert.equal(project.projectCriteria.length, 0);

    project = projects[2];
    assert.equal(project.id, 3);
    assert.equal(project.title, 'Test Project 2');
    assert.equal(project.status, 'OPEN');
    assert.isDefined(project.start);
    assert.equal(project.grade, 4);
    assert.equal(project.projectCategories.length, 0);
    assert.equal(project.members.length, 0);
    assert.equal(project.projectCriteria.length, 0);
  });
});
