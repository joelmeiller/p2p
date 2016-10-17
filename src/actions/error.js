export const API_ERROR = '/error/API_ERROR';


export default (error, fetch) => (dispatch) => {
  dispatch(fetch);
  dispatch({
    type: API_ERROR,
    error,
  });
};
