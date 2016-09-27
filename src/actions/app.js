import getUserAndProjectSettings from '../middleware/getUserAndProjectSettings.mock.js';

import connect from './utils/connect.js';

export const SET_TITLE = 'app/SET_TITLE';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

export const fetchUserAndProjectSettings = connect(REQUEST_USER, RECEIVE_USER,
  getUserAndProjectSettings,
  data => ({
    project: data.project,
    user: data.user,
  })
);
