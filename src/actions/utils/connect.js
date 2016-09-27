// Middleware

// Actions
export const REQUEST_TEAM = '/team/REQUEST_TEAM';
export const RECEIVE_TEAM = '/team/RECEIVE_TEAM';

const requestData = requestAction => ({
  type: requestAction,
});

const receiveData = (receiveAction, data) => ({
  type: receiveAction,
  ...data,
});

const shouldFetchData = (state) => {
  if (!state) {
    return true;
  }
  return !state.isFetching;
};

export default (requestAction, receiveAction, middleware, mapData) => () => (dispatch, state) => {
  if (shouldFetchData(state)) {
    dispatch(requestData(requestAction));

    middleware((data) => {
      dispatch(receiveData(receiveAction, mapData(data)));
    });
  }
};
