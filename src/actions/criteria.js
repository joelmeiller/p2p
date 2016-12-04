// Node imports
import 'isomorphic-fetch';
import uuid from 'uuid';

// Middleware
import { default as apiGetCriterias } from '../middleware/criteria/getCriteria.js';
import { default as apiSaveCriterias } from '../middleware/criteria/saveCriteria.js';

export const ADD_CRITERIA = '/criteria/ADD_CRITERIA';
export const EDIT_CRITERIA = '/criteria/EDIT_CRITERIA';
export const SAVE_CRITERIAS = '/criteria/SAVE_CRITERIAS';
export const REMOVE_CRITERIA = '/criteria/REMOVE_CRITERIA';
export const SET_CRITERIA = '/criteria/SET_CRITERIA';
export const SET_CRITERIA_VALUE = '/criteria/SET_CRITERIA_VALUE';
export const SET_NEW_CRITERIA_VALUE = '/criteria/SET_NEW_CRITERIA_VALUE';
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

  // New self defined crtieria
  if (addCategory.isSelfDefined && state.newCategoryId === addCategory.categoryId) {
    const category = state.categories.find(c =>
      c.categoryId === addCategory.categoryId && c.categoryId === state.newCategoryId);

    if (category) {
      category.criterias.push({
        criteriaId: uuid.v4(), // Required for further changes before saving
        label: state.newValue,
        added: true,
      });

      const categories = state.categories.map(cat =>
        (cat.categoryId === category.categoryId ?
        category : cat)
      );

      dispatch({
        type: ADD_CRITERIA,
        categories,
        newCategoryId: undefined,
        newValue: '',
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

export const setCriteriaValue = (value, criteria, category) => (dispatch, getState) => {
  const state = getState().criteria;

  // Self defined crtierias
  if (category.isSelfDefined) {
    const categories = state.categories.map(cat => (
      cat.categoryId === category.categoryId ? {
      ...cat,
      criterias: cat.criterias.map(crit => ({
        ...crit,
        label: crit.criteriaId === criteria.criteriaId ? value : crit.label,
        updated: !crit.added, // Set as updated only in case it is not a new criteria
      })),
    } : cat));

    dispatch({
      type: SET_CRITERIA_VALUE,
      categories,
    });
  }
};

export const setNewCriteriaValue = (value, category) => ({
  type: SET_NEW_CRITERIA_VALUE,
  newCategoryId: category.categoryId,
  newValue: value,
});

export const saveCriterias = props => (dispatch, getState) => {
  const state = getState().criteria;

  if (state.categories) {
    apiSaveCriterias(state.categories, (data) => {
      if (data.status === 500) {
        // TODO: i18n
        // TODO: Error handling
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

  props.router.push('/ip-p2p');
};



export const cancel = props => (dispatch) => {
  dispatch(requestData());
  apiGetCriterias(data => dispatch(receiveData(data)));

  props.router.push('/ip-p2p');
};
