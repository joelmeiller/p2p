// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Local imports
import configureStore from '../store/configureStore.js';

import App from '../containers/app.jsx';
import Dashboard from '../containers/dashboard.jsx';

// Configure store & history
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
<Provider store={store}>
  <Router history={history}>
     <Route path="/" component={App}>
       <IndexRoute component={Dashboard} />
     </Route>
  </Router>
</Provider>
, document.getElementById('react-root'));
