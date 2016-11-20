// React imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import App from './app.jsx';
import Dashboard from '../../containers/Dashboard.jsx';
import CriteriaOverview from '../../containers/CriteriaOverview.jsx';
import TeamOverview from '../../containers/TeamOverview.jsx';
import MyRatingOverview from '../../containers/MyRatingOverview.jsx';
import TeamRatingOverview from '../../containers/TeamRatingOverview.jsx';
import TeammemberEvaluation from '../../containers/TeammemberEvaluation.jsx';
import ProjectContainer from '../../containers/ProjectContainer.jsx';


export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <MuiThemeProvider>
      <Provider store={store} >
        <Router history={history} >
          <Route path="/">
            <IndexRedirect to="ip-p2p" />

            <Route path="ip-p2p" component={App} >
              {/* General routes */}
              <IndexRoute component={Dashboard} />

              {/* TM & QM Rating routes */}
              <Route path="team/rating" component={TeamRatingOverview} />
              <Route path="team/rating/:id" component={TeammemberEvaluation} />
              <Route path="myrating" component={MyRatingOverview} />

              {/* QM edit routes */}
              <Route path="criteria/edit" component={CriteriaOverview} />
              <Route path="team/edit" component={TeamOverview} />

              {/* Coach routes*/}
              <Route path="projects/:id" component={ProjectContainer} />

              {/* Test Routes */}
              <Route path="/:test" component={TeamRatingOverview} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
