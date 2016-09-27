export const API_ERROR = '/error/API_ERROR';


export const apiError = (message, fetch) => (dispatch) => {
  dispatch(fetch);
  dispatch({
    type: API_ERROR,
    message,
  });
};
