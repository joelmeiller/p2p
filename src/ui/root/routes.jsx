// React imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Material Design Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import App from './app.jsx';
import Dashboard from '../../containers/Dashboard.jsx';
import CriteriaOverview from '../../containers/CriteriaOverview.jsx';
import TeamOverview from '../../containers/TeamOverview.jsx';
import MemberRatingContainer from '../../containers/MemberRatingContainer.jsx';
import ProgressPageContainer from '../../containers/ProgressPageContainer.jsx';
import EvaluationContainer from '../../containers/EvaluationContainer.jsx';
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
              <Route path="team/rating" component={ProgressPageContainer} />
              <Route path="team/rating/:slug" component={EvaluationContainer} />
              <Route path="team/member/rating" component={MemberRatingContainer} />

              {/* QM edit routes */}
              <Route path="criteria/edit" component={CriteriaOverview} />
              <Route path="team/edit" component={TeamOverview} />

              {/* Coach routes*/}
              <Route path="projects/:id" component={ProjectContainer} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
