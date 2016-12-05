/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/project/categories`;

let categories = undefined;

describe('manage project categories', () => {
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
        categories = data;
        done();
      });
    });
  });

  it('get categories', () => {
    // Check categories
    assert.isDefined(categories);
    assert.equal(categories.length, 3);

    // Member 'Heidi Von der Heide'
    let cat = categories[0];
    assert.equal(cat.id, 2);
    assert.equal(cat.category.id, 2);
    assert.equal(cat.category.title, 'Kommunikative Kompetenzen');
    assert.equal(cat.category.type, 'PREDEFINED');
    assert.equal(cat.category.criterias.length, 2);
    assert.equal(cat.projectCriterias.length, 0);

    cat = categories[1];
    assert.equal(cat.id, 1);
    assert.equal(cat.category.id, 1);
    assert.equal(cat.category.title, 'Basale Kompetenzen');
    assert.equal(cat.category.type, 'PREDEFINED');
    assert.equal(cat.category.criterias.length, 2);
    assert.equal(cat.projectCriterias.length, 1);
    assert.equal(cat.projectCriterias[0].id, 1);
    assert.equal(cat.projectCriterias[0].criteria.id, 1);

    cat = categories[2];
    assert.equal(cat.id, 3);
    assert.equal(cat.category.id, 6);
    assert.equal(cat.category.title, 'Own Criterias');
    assert.equal(cat.category.type, 'SELFDEFINED');
    assert.equal(cat.category.criterias.length, 1);
    assert.equal(cat.projectCriterias.length, 1);
    assert.equal(cat.projectCriterias[0].id, 2);
    assert.equal(cat.projectCriterias[0].criteria.id, 11);
  });

  it('add new project criterias', () => {
    // TODO: add integration tests
  });

  it('update slef defined project criterias', () => {
    // TODO: add integration tests
  });

  it('remove existing project criterias', () => {
    // TODO: add integration tests
  });
});
