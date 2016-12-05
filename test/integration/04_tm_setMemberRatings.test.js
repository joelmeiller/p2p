/* eslint-env mocha */

// REMARK: Integration test are dependent on the loaded test data on server
// --> Restart tomcat server to reload test data fixtures
// Test Data:
// Check the fixtures classes for further information on test data

import { assert } from 'chai';

import fetch from 'isomorphic-fetch';

const api = `http://localhost:8080/ip-p2p/api/project/member/ratings`;

let member = undefined;

describe('set member ratings', () => {
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
        member = data;
        done();
      });
    });
  });

  it('get ratings', () => {
    // Check member
    assert.equal(member.id, 1);
    assert.equal(member.progress, 0);
    assert.equal(member.rating, 0);
    assert.isTrue(member.qm);
    assert.isNotTrue(member.canFinalize);
    assert.equal(member.status, 'NEW');

    assert.equal(member.student.firstName, 'Max');
    assert.equal(member.student.lastName, 'Muster');
    assert.equal(member.student.email, 'max.muster@students.fhnw.ch');
    assert.equal(member.student.type, 'STUDENT');
    assert.equal(member.student.studentType, 'BB');
    assert.equal(member.student.status, 'FREE');
    assert.equal(member.student.slug, 'max-muster');
    assert.isNotTrue(member.student.coach);
    assert.isTrue(member.student.qm);

    assert.equal(member.activeRole.shortcut, 'QM');

    // Check ratings
    assert.isDefined(member.ratings);
    assert.equal(member.ratings.length, 2);

    // First rating
    let rating = member.ratings[0];
    assert.equal(rating.id, 3);
    assert.equal(rating.rating, 0);
    assert.equal(rating.comment, '');
    assert.equal(rating.member.id, 2);
    assert.equal(rating.member.student.id, 13);
    assert.equal(rating.criteriaRatings.length, 2);

    let crit = rating.criteriaRatings[0];
    assert.equal(crit.id, 5);
    assert.equal(crit.rating, 0);
    assert.equal(crit.criteria.id, 1);

    crit = rating.criteriaRatings[1];
    assert.equal(crit.id, 6);
    assert.equal(crit.rating, 0);
    assert.equal(crit.criteria.id, 11);


    // Second rating
    rating = member.ratings[1];

    assert.equal(rating.id, 4);
    assert.equal(rating.rating, 0);
    assert.equal(rating.comment, '');
    assert.equal(rating.member.id, 1);
    assert.equal(rating.member.student.id, 1);
    assert.equal(rating.criteriaRatings.length, 2);

    crit = rating.criteriaRatings[0];
    assert.equal(crit.id, 7);
    assert.equal(crit.rating, 0);
    assert.equal(crit.criteria.id, 1);

    crit = rating.criteriaRatings[1];
    assert.equal(crit.id, 8);
    assert.equal(crit.rating, 0);
    assert.equal(crit.criteria.id, 11);
  });

  it('update member ratings', () => {
    // TODO: add integration tests
  });
});
