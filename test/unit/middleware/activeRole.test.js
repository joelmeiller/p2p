/* eslint-env mocha */

import { assert } from 'chai';

import { getActiveRole, getActiveRoleShortcut, getActiveRoleTitle } from '../../../src/middleware/utils/activeRole.js';

const rolesWithActive = [{
  shortcut: 'SA',
  title: 'Software Architekt',
  active: true,
}, {
  shortcut: 'QM',
  title: 'Quality Manager',
}, {
  shortcut: 'RE',
  title: 'Requirements Engineer',
}];

const rolesNoActive = [{
  shortcut: 'SA',
  title: 'Software Architekt',
}, {
  shortcut: 'QM',
  title: 'Quality Manager',
}, {
  shortcut: 'RE',
  title: 'Requirements Engineer',
}];

describe('middleware/utils/activeRole', () => {
  describe('getActiveRole', () => {
    it('with active role', () => {
      const activeRole = getActiveRole(rolesWithActive);
      assert.isDefined(activeRole);
      assert.equal(activeRole.shortcut, rolesWithActive[0].shortcut);
      assert.equal(activeRole.title, rolesWithActive[0].title);
    });
    it('no active role / empty', () => {
      let activeRole = getActiveRole(rolesNoActive);
      assert.isUndefined(activeRole);

      activeRole = getActiveRole([]);
      assert.isUndefined(activeRole);
    });
  });

  describe('getActiveRoleShortcut', () => {
    it('with active role', () => {
      assert.equal(getActiveRoleShortcut(rolesWithActive), rolesWithActive[0].shortcut);
    });
    it('no active role / empty', () => {
      assert.equal(getActiveRoleShortcut(rolesNoActive), '-');
      assert.equal(getActiveRoleShortcut([]), '-');
    });
  });

  describe('getActiveRoleTitle', () => {
    it('with active role', () => {
      assert.equal(getActiveRoleTitle(rolesWithActive), rolesWithActive[0].title);
    });
    it('no active role / empty', () => {
      assert.equal(getActiveRoleTitle(rolesNoActive), 'Unknown');
      assert.equal(getActiveRoleTitle([]), 'Unknown');
    });
  });
});
