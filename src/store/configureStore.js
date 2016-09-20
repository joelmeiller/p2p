import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as form } from 'redux-form';

import { routerReducer as routing } from 'react-router-redux';

import team from '../reducers/team.js';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      form,
      routing,
      team,
    }),
    {},
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

export default configureStore;