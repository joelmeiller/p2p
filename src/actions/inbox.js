// Middleware imports
import apiSetMemberStatus from '../middleware/students/setMemberStatus.js';

// Actions
import { setRatingStatus } from './app.js';

export const REQUEST_INBOX = '/inbox/REQUEST_INBOX';
export const RECEIVE_INBOX = '/inbox/RECEIVE_INBOX';
export const PERFORM_ACTION = '/inbox/PERFORM_ACTION';
export const ADD_ACTION = '/inbox/ADD_ACTION';

// Action Types
export const UPDATE_STATUS = '/action/UPDATE_STATUS';
export const CLOSE = '/actions/CLOSE';

export const addAction = action => ({
  type: ADD_ACTION,
  action,
});

export const performAction = action => (dispatch) => {
  switch (action.params.type) {
    case UPDATE_STATUS:
      apiSetMemberStatus(action.params.status, (data) => {
        if (data) {
          dispatch(setRatingStatus({
            isOpen: data.open,
            isFinal: data.final,
            isAccepted: data.accepted,
          }));

          console.log(data);
          if (data.accepted) {
            // TODO: i18n
            const message = "Die Bestätigung wurde erfolgreich übermittelt und deine Bewertung ist damit abgeschlossen :)";
            dispatch(addAction({
              id: '900',
              message,
              type: 'info',
              date: new Date(),
              buttonText: 'Okay',
              params: {
                type: CLOSE,
              },
            }));
          }
        }
      });
      break;
    default:
      // no action
  }

  dispatch({
    type: PERFORM_ACTION,
    action,
  });
};
