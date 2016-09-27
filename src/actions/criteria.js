// Middleware
import { default as apiGetCriteria } from '../middleware/getCriteria.mock.js';
import { default as apiDeleteCriteria } from '../middleware/criteria/deleteCriteria.mock.js';
import { default as apiAddCriteria } from '../middleware/criteria/addCriteria.mock.js';
import { default as apiError } from './error.js';

export const DELETE_CRITERIA = '/criteria/DELETE_CRITERIA';
export const REQUEST_CRITERIA = '/criteria/REQUEST_CRITERIA';
export const RECEIVE_CRITERIA = '/criteria/RECEIVE_CRITERIA';

const requestData = () => ({
  type: REQUEST_CRITERIA,
  fetched: false,
});

const receiveData = data => ({
  type: RECEIVE_CRITERIA,
  ...data,
  fetched: true,
});

const shouldFetchData = (state) => {
  if (!state.criteria || state.relaod) {
    return true;
  }
  return !state.criteria.isFetching && !state.criteria.fetched;
};


export const fetchCriteria = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    dispatch(requestData());

    apiGetCriteria((data) => {
      dispatch(receiveData(data));
    });
  }
};

export const deleteCriteria = criteria => (dispatch, getState) => {
  const state = getState();
  const categories = (state.criteria ? state.criteria.categories : [])
    .map(category => ({
      ...category,
      criterias: (category.criterias ? category.criterias.filter(crit =>
        crit.id !== criteria.id) : []),
    }));

  apiDeleteCriteria(criteria.id, (err) => {
    if (err) dispatch(apiError(fetchCriteria));
  });

  dispatch({
    type: DELETE_CRITERIA,
    categories,
  });
};

export const addCriteria = values => (dispatch, getState) => {
  const state = getState();
  const categories = (state.criteria ? state.criteria.categories : [])
    .map(category => (category.id === values.categoryId ? {
      ...category,
      criterias: (category.criterias ?
        category.criterias.push(values) :
        [values]),
    } : category));

  apiAddCriteria(values, (err) => {
    if (err) dispatch(apiError(fetchCriteria));
  });

  dispatch({
    type: DELETE_CRITERIA,
    categories,
  });
};


