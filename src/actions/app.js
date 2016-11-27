// Actions
import { addAction, UPDATE_STATUS } from '../actions/inbox.js';

// Middleware
import { OPEN, ACCEPTED } from '../middleware/students/setMemberStatus.js';
import apiGetUserSettings from '../middleware/user/getUserSettings.js';
import apiCloseProject from '../middleware/projects/closeProject.js';


export const SET_TITLE = 'app/SET_TITLE';
export const SET_STATUS = 'app/SET_STATUS';
export const CLOSE_PROJECT = 'app/CLOSE_PROJECT';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

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
    })
  });
}


const requestData = () => ({
  type: REQUEST_USER,
});

const receiveData = data => (dispatch) => {
  dispatch({
    type: RECEIVE_USER,
    project: data.project,
    user: data.user,
    rating: data.rating,
  });

  // Set welcome action item for new member
  if (data.rating && data.rating.isNew) {
    const username = `${data.user.firstName} ${data.user.lastName}`;
    const message = data.user.isQM ?
    `Willkommen ${username} im Project ${data.project.title}. Bitte bestätige, dass deine Zuteilung als Quality Manager (QM) korrekt ist oder melde dich bei den Projektverantwortlichen.` :
    `Willkommen ${username} im Project ${data.project.title}. Bitte bestätige, dass deine Zuteilung korrekt ist oder melde dich beim Quality Manager dieses Projektes.` ;
    dispatch(addAction({
      id: '100',
      message,
      type: 'confirm',
      date: new Date(),
      buttonText: 'Ich bestätige',
      params: {
        type: UPDATE_STATUS,
        status: OPEN,
      },
    }));
  }

  // Set accept rating action item when all ratings are available
  if (data.project && data.project.isFinal && !data.rating.isAccepted) {
    const message = `Deine Bewertung für das Projekt ${data.project.title} ist abgeschlossen. Bitte bestätige, dass du mit deiner Bewertung und der damit verbundenen Abweichung gegenüber der Teamnote einverstanden bist oder nimm direkt mit dem Quality Manager (QM) Kontakt auf.` ;
    dispatch(addAction({
      id: '500',
      message,
      type: 'confirm',
      date: new Date(),
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


export const fetchUserAndProjectSettings = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetUserSettings((data) => {
      dispatch(receiveData(data));
    });
  }
};
