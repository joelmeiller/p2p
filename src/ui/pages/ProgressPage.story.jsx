import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProgressPage from './ProgressPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::ProgressPage', () => (
  <div className="app flex-center-middle">
    <ProgressPage
      title="Progress"
      progress={[
        {
          name: "Michelle Steiner",
          role: "QM",
          progress: 100
        }, {
          name: "Rebekka Burri",
          role: "TEC",
          progress: 45
        }, {
          name: "Martin Steiner",
          role: "QM",
          progress: 100
        }, {
          name: "Bettina Rust",
          role: "REQ",
          progress: 20
        }
      ]}
      />
  </div>
))
;
