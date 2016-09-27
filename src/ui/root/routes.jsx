// React imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import App from './app.jsx';
import CriteriaOverview from '../../containers/CriteriaOverview.jsx';
import MyRatingOverview from '../../containers/MyRatingOverview.jsx';
import TeammemberOverview from '../../containers/TeammemberOverview.jsx';
import TeammemberEvaluation from '../../containers/TeammemberEvaluation.jsx';


export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <MuiThemeProvider>
      <Provider store={store} >
        <Router history={history} >
          <Route path="/" component={App} >
            <IndexRoute component={TeammemberOverview} />

            <Route path="/team/rating" component={TeammemberOverview} />
            <Route path="/team/rating/:slug" component={TeammemberEvaluation} />
            <Route path="/myrating" component={MyRatingOverview} />

            <Route path="/criteria/edit" component={CriteriaOverview} />


            {/* Test Routes */}
            <Route path="/:test" component={TeammemberOverview} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
