// node imports
import 'babel-polyfill';

// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Local imports
import configureStore from './store/configureStore.js';

import App from './ui/layouts/app.jsx';
import MyRatingOverview from './containers/MyRatingOverview.jsx';
import TeammemberOverview from './containers/TeammemberOverview.jsx';
import TeammemberEvaluation from './containers/TeammemberEvaluation.jsx';

// Load CSS styles
import './ui/styles/import.css';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Configure store & history
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store} >
      <Router history={history} >
        <Route path="/" component={App} >
          <IndexRoute component={TeammemberOverview} />
          <Route path="/myrating" component={MyRatingOverview} />
          <Route path="/team/rating/:slug" component={TeammemberEvaluation} />
          {/* Test Routes */}
          <Route path="/:test" component={TeammemberOverview} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('react-root'));
