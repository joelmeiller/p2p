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
import TeamRatingOverview from '../../containers/TeamRatingOverview.jsx';
import CreateProjectContainer from '../../containers/CreateProjectContainer.jsx';
import ShowProjectContainer from '../../containers/ShowProjectContainer.jsx';
import MemberRatingContainer from '../../containers/MemberRatingContainer.jsx';
import ProgressPageContainer from '../../containers/ProgressPageContainer.jsx';
import EvaluationContainer from '../../containers/EvaluationContainer.jsx';


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

              {/* TM Rating routes */}
              <Route path="team/rating/:slug" component={EvaluationContainer} />
              <Route path="team/member/rating" component={MemberRatingContainer} />

              {/* QM Rating routes */}
              <Route path="team/rating" component={ProgressPageContainer} />
              <Route path="team/member/rating/:slug" component={MemberRatingContainer} />

              {/* QM edit routes */}
              <Route path="criteria/edit" component={CriteriaOverview} />
              <Route path="team/edit" component={TeamOverview} />

              {/* Coach routes*/}
              <Route path="projects/_new" component={CreateProjectContainer} />
              <Route path="projects/:id" component={ShowProjectContainer} />

              {/* Test Routes */}
              <Route path="/:test" component={TeamRatingOverview} />
            </Route>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
