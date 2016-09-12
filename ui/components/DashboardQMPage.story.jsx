import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DashboardQMPage from './DashboardQMPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::DashboardQMPage', () => (
  <div className="app flex-center-middle">
    <DashboardQMPage
      title="Dashboard"
      entries={[
        {
          name: "Michelle Steiner",
          role: "QM",
          stars: 3,
          deviation: "deviation: "+2,
          grade: "grade: "+5.1,
          status: "approved"
        }, {
          name: "Rebekka Burri",
          role: "TEC",
          stars: 3,
          deviation: "deviation: "+0,
          grade: "grade: "+5.0,
          status: "approved"
        }, {
          name: "Martin Steiner",
          role: "QM",
          stars: 1,
          deviation: "deviation: "+2,
          grade: "grade: "+4.5,
          status: "approved"
        }, {
          name: "Bettina Rust",
          role: "REQ",
          stars: 5,
          deviation: "deviation: "+0,
          grade: "grade: "+6.0,
          status: "approved"
        }, {
          name: "Andreas Lee",
          role: "UM",
          stars: 5,
          deviation: "deviation: "+0,
          grade: "grade: "+6.0,
          status: "approved"
        }
        , {
          name: "Joel Dumont",
          role: "REQ",
          stars: 4,
          deviation: "deviation: "+0,
          grade: "grade: "+6.0,
          status: "pending"
        }, {
          name: "Thierry Bill",
          role: "IM",
          stars: 5,
          deviation: "deviation: "+0,
          grade: "grade: "+6.0,
          status: "approved"
        }
      ]}
      text="Submit All Ratings"
      />
  </div>
))
;
