import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { routerReducer as routing } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr'

import { default as app } from '../reducers/app.js';
import { default as criteria } from '../reducers/criteria.js';
import { default as inbox } from '../reducers/inbox.js';
import { default as rating } from '../reducers/ratings.js';
import { default as myrating } from '../reducers/myrating.js';
import { default as role } from '../reducers/roles.js';
import { default as team } from '../reducers/team.js';
import { default as projectList } from '../reducers/projectList.js';
import { default as project } from '../reducers/project.js';


import { reducer as autosuggest } from '../ui/elements/AutoSuggest.jsx';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      app,
      criteria,
      inbox,
      rating,
      myrating,
      routing,
      role,
      team,
      projectList,
      project,
      autosuggest,
      toastr: toastrReducer,
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
