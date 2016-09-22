import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as form } from 'redux-form';

import { routerReducer as routing } from 'react-router-redux';

import { reducer as app } from '../ui/layouts/app.jsx';
import { default as team } from '../reducers/team.js';
import { default as member } from '../reducers/member.js';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      app,
      form,
      member,
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
