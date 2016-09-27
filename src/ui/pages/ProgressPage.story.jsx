import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ProgressPage from './ProgressPage.jsx';


storiesOf('pages/ProgressPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <ProgressPage
      members={[
        {
          id: '12345',
          name: 'Michelle Steiner',
          role: 'QM',
          progress: 100,
        }, {
          id: '12346',
          name: 'Rebekka Burri',
          role: 'TEC',
          progress: 45,
        }, {
          id: '12347',
          name: 'Martin Steiner',
          role: 'QM',
          progress: 92,
        }, {
          id: '12348',
          name: 'Bettina Rust',
          role: 'REQ',
          progress: 20,
        },
      ]}
    />
  </div>
))
.add('::warning', () => (
  <div className="app flex-center-middle">
    <ProgressPage
      members={[
        {
          id: '12345',
          name: 'Michelle Steiner',
          role: 'QM',
          progress: 100,
        }, {
          id: '12346',
          name: 'Rebekka Burri',
          role: 'TEC',
          progress: 45,
          statusWarning: true,
        }, {
          id: '12347',
          name: 'Martin Steiner',
          role: 'QM',
          progress: 100,
        }, {
          id: '12348',
          name: 'Bettina Rust',
          role: 'REQ',
          progress: 20,
          statusWarning: true,
        },
      ]}
    />
  </div>
))
;
