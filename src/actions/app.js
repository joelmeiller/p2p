// Actions
import { addAction, UPDATE_STATUS } from '../actions/inbox.js';

// Middleware
import { OPEN } from '../middleware/students/setMemberStatus.js';
import getUserSettings from '../middleware/user/getUserSettings.js';


export const SET_TITLE = 'app/SET_TITLE';
export const REQUEST_USER = 'app/REQUEST_USER_AND_PROJECT';
export const RECEIVE_USER = 'app/RECEIVE_USER_AND_PROJECT';

export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

const requestData = () => ({
  type: REQUEST_USER,
});

const receiveData = data => (dispatch) => {
  dispatch({
    type: RECEIVE_USER,
    project: data.project,
    user: data.user,
  });

  if (!data.user.isCoach && !data.user.isAccepted) {
    dispatch(addAction({
      id: '100',
      message: `Willkommen ${data.user.username} im Project ${data.project.title}. Bitte bestätige, dass deine Zuteilung korrekt ist oder melde dich beim Quality Manager dieses Projektes.`,
      type: 'confirm',
      date: new Date(),
      buttonText: 'Ich bestätige',
      params: {
        type: UPDATE_STATUS,
        status: OPEN,
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

    getUserSettings((data) => {
      dispatch(receiveData(data));
    });
  }
};
