/* eslint-env mocha */

import { assert } from 'chai';


import { authImpersonate, authLogin, authLogout, authInfo } from '../../src/middleware/auth.js';
import apiGetUserSettings from '../../src/middleware/user/getUserSettings.js';


const

describe('load user settings', () => {

  before(() => {
    authImpersonate({ impersonatedEmail: 'max.muster@students.fhnw.ch' }).then(() => {
      authInfo().then((data) => {
      /* global window: false */
      const app = getState().app;
      dispatch(receiveData(data));
      if (data.loggedIn) {
        dispatch(getUserSettings());
      } else if (window.ticket && !app.loggedOut) {
        authLogin(window.ticket).then(() => {
          dispatch(receiveData({ loggedIn: true }));
          dispatch(getUserSettings());
        });
      }
    });
    });
  });
});
