import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { routerReducer as routing } from 'react-router-redux';

import { default as app } from '../reducers/app.js';
import { default as criteria } from '../reducers/criteria.js';
import { default as inbox } from '../reducers/inbox.js';
import { default as member } from '../reducers/member.js';
import { default as myrating } from '../reducers/myrating.js';
import { default as role } from '../reducers/roles.js';
import { default as team } from '../reducers/team.js';
import { default as projects } from '../reducers/projects.js';

import { reducer as autosuggest } from '../ui/elements/AutoSuggest.jsx';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      app,
      criteria,
      inbox,
      member,
      myrating,
      routing,
      role,
      team,
      projects,
      autosuggest,
    }),
    {},
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
};

export default configureStore;
