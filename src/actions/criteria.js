// Node imports
import 'isomorphic-fetch';

// Middleware
import { default as apiGetCriterias } from '../middleware/criteria/getCriteria.js';
import { default as apiSaveCriterias } from '../middleware/criteria/saveCriteria.js';

export const ADD_CRITERIA = '/criteria/ADD_CRITERIA';
export const EDIT_CRITERIA = '/criteria/EDIT_CRITERIA';
export const SAVE_CRITERIAS = '/criteria/SAVE_CRITERIAS';
export const REMOVE_CRITERIA = '/criteria/REMOVE_CRITERIA';
export const SET_CRITERIA = '/criteria/SET_CRITERIA';
export const SET_CRITERIA_VALUE = '/criteria/SET_CRITERIA_VALUE';
export const REQUEST_CRITERIA = '/criteria/REQUEST_CRITERIA';
export const RECEIVE_CRITERIA = '/criteria/RECEIVE_CRITERIA';


const requestData = () => ({
  type: REQUEST_CRITERIA,
});

const receiveData = data => ({
  type: RECEIVE_CRITERIA,
  categories: data,
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
    apiGetCriterias(data => dispatch(receiveData(data)));
  }
};

export const removeCriteria = criteria => (dispatch, getState) => {
  const state = getState().criteria;

  const categories = (state.categories || [])
    .map(category => ({
      ...category,
      criterias: (category.criterias ? category.criterias.map(crit => ({
        ...crit,
        removed: crit.removed || crit.id === criteria.id
      })) : []),
    }));

  dispatch({
    type: REMOVE_CRITERIA,
    categories,
  });
};

export const setCriteria = (criteriaId, category) => ({
  type: SET_CRITERIA,
  selectedCriteriaId: criteriaId,
  selectedCategoryId: category.categoryId,
});

export const addCriteria = addCategory => (dispatch, getState) => {
  const state = getState().criteria;

  console.log(state, addCategory);

  // Self defined crtierias
  if (addCategory.isSelfDefined && state.changedCategoryId === addCategory.categoryId) {
    const category = state.categories.find(c =>
      c.categoryId === addCategory.categoryId && c.categoryId === state.changedCategoryId);

    if (category) {
      const newCriteria = state.changedCriteriaId ? addCategory.find(crit =>
        crit.criteriaId === state.changedCriteriaId) : {};

      category.criterias.push({
        ...newCriteria,
        label: state.changedValue,
        added: true,
      });

      const categories = state.categories.map(cat =>
        (cat.categoryId === category.categoryId ?
        category : cat)
      );

      dispatch({
        type: ADD_CRITERIA,
        categories,
      });
    }

  // Predefined criterias from dropdown
  } else if (state.selectedCategoryId === addCategory.categoryId && state.selectedCriteriaId) {
    const category = state.categories.find(c =>
      c.categoryId === addCategory.categoryId && c.categoryId === state.selectedCategoryId);

    if (category) {
      const newCriteria = category.selectCriterias.find(crit =>
        crit.criteriaId === state.selectedCriteriaId);

      if (newCriteria) {
        category.criterias.push({
          criteriaId: newCriteria.criteriaId,
          label: newCriteria.label,
          added: true,
        });

        const categories = state.categories.map(cat =>
          (cat.categoryId === category.categoryId ?
          category : cat)
        );

        dispatch({
          type: ADD_CRITERIA,
          categories,
        });
      }
    }
  }
};

export const setCriteriaValue = (value, criteria, category) => ({
  type: SET_CRITERIA_VALUE,
  changedCriteriaId: criteria ? criteria.criteriaId : undefined,
  changedCategoryId: category.categoryId,
  changedValue: value,
});

export const saveCriterias = props => (dispatch, getState) => {
  const state = getState().criteria;

  if (state.categories) {
    apiSaveCriterias(state.categories, (data) => {
      if (data.status === 500) {
        alert('Criteria could not be saved');
      } else {
        apiGetCriterias(data => dispatch(receiveData(data)));
      }
    });

    dispatch({
      type: SAVE_CRITERIAS,
      categories: state.categories,
    });
  }

  props.router.push('/');
};



export const cancel = props => (dispatch) => {
  dispatch(requestData());
  apiGetCriterias(data => dispatch(receiveData(data)));

  props.router.push('/');
};
