// Node imports
import 'isomorphic-fetch';

// Middleware
import { default as apiGetRoles } from '../middleware/role/getRoles.js';

export const REQUEST_ROLE = '/role/REQUEST_ROLE';
export const RECEIVE_ROLE = '/role/RECEIVE_ROLE';


const requestData = () => ({
  type: REQUEST_ROLE,
});

const receiveData = data => ({
  type: RECEIVE_ROLE,
  roles: data,
});

const shouldFetchData = (state) => {
  if (!state.role || state.relaod) {
    return true;
  }
  return !state.role.isFetching && !state.role.fetched;
};


export const fetchRoles = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());
    apiGetRoles(data => dispatch(receiveData(data)));
  }
};
