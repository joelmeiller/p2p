// Actions
import { addAction, UPDATE_STATUS } from '../actions/inbox.js';

// Middleware
import { OPEN, ACCEPTED } from '../middleware/students/setMemberStatus.js';
import apiGetUserSettings from '../middleware/user/getUserSettings.js';
import apiCloseProject from '../middleware/projects/closeProject.js';
import { authImpersonate, authLogin, authLogout, authInfo } from '../middleware/auth.js';

export const SET_TITLE = 'app/SET_TITLE';
export const SET_STATUS = 'app/SET_STATUS';
export const SET_AUTH_INFO = 'app/SET_AUTH_INFO';
export const SET_IMPERSONATION = 'app/SET_IMPERSONATION';
export const CLOSE_PROJECT = 'app/CLOSE_PROJECT';
export const REQUEST = 'app/REQUEST';
export const RECEIVE = 'app/RECEIVE';

export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

export const setRatingStatus = rating => (dispatch) => {
  dispatch({
    type: SET_STATUS,
    rating,
  });
};

export const closeProject = () => (dispatch, getState) => {
  const state = getState().app;
  apiCloseProject(state.project.id, (data) => {
    dispatch({
      type: CLOSE_PROJECT,
      project: data.project,
    });
  });
};

export const setImpersonation = email => (dispatch) => {
  dispatch({
    type: SET_IMPERSONATION,
    value: email,
  });
};

const requestData = () => ({
  type: REQUEST,
});

const receiveData = data => (dispatch) => {
  dispatch({
    type: RECEIVE,
    ...data,
  });
};

const receiveUserData = data => (dispatch) => {
  dispatch({
    type: RECEIVE,
    project: data.project,
    user: data.user,
    rating: data.rating,
  });

  // Set welcome action item for new member
  if (data.rating && data.rating.isNew) {
    const username = `${data.user.firstName} ${data.user.lastName}`;
    const message = data.user.isQM ?
    // TODO: i18n
    `Willkommen ${username} im Project ${data.project.title}. Bitte bestätige, dass deine Zuteilung als Quality Manager (QM) korrekt ist oder melde dich bei den Projektverantwortlichen.` :
    `Willkommen ${username} im Project ${data.project.title}. Bitte bestätige, dass deine Zuteilung korrekt ist oder melde dich beim Quality Manager dieses Projektes.`;
    dispatch(addAction({
      id: '100',
      message,
      type: 'confirm',
      date: new Date(),
      // TODO: i18n
      buttonText: 'Ich bestätige',
      params: {
        type: UPDATE_STATUS,
        status: OPEN,
      },
    }));
  }

  // Set accept rating action item when all ratings are available
  if (data.project && data.project.isFinal && !data.rating.isAccepted) {
    // TODO: i18n
    const message = `Deine Bewertung für das Projekt ${data.project.title} ist abgeschlossen. Bitte bestätige, dass du mit deiner Bewertung und der damit verbundenen Abweichung gegenüber der Teamnote einverstanden bist oder nimm direkt mit dem Quality Manager (QM) Kontakt auf.`;
    dispatch(addAction({
      id: '500',
      message,
      type: 'confirm',
      date: new Date(),
      // TODO: i18n
      buttonText: 'Bewertung akzeptieren',
      params: {
        type: UPDATE_STATUS,
        status: ACCEPTED,
      },
    }));
  }
};

const shouldFetchData = (state) => {
  if (!state.app || state.relaod) {
    return true;
  }
  return !state.app.isFetching && !state.app.fetched;
};

export const getUserSettings = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetUserSettings((data) => {
      dispatch(receiveUserData(data));
    });
  }
};

export const updateAuthStatus = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    authInfo().then((data) => {
      /* global window: false */
      const app = getState().app;
      dispatch(receiveData(data));
      if (data.loggedIn) {
        dispatch(getUserSettings());
      } else if (window.ticket && app.loggedIn) {
        authLogin(window.ticket).then(() => {
          dispatch(receiveData({ loggedIn: true }));
          dispatch(getUserSettings());
        });
      }
    });
  }
};

export const doImpersonation = () => (dispatch, getState) => {
  const { impersonatedEmail } = getState().app;
  dispatch(requestData());
  authImpersonate({ impersonatedEmail }).then(() => {
    dispatch(receiveData({}));
    dispatch(updateAuthStatus());
  });
};

export const doLogout = () => dispatch => (
  authLogout().then(() => {
    dispatch({
      type: RECEIVE,
      loggedIn: false,
    });
  })
);
