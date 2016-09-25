import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TeamRatingPage from './TeamRatingPage.jsx';

storiesOf('components/Pages', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::TeamRatingPage', () => (
  <div className="app flex-center-middle">
    <TeamRatingPage
      members={[
        {
          id: '123456',
          name: 'Michelle Steiner',
          role: 'QM',
          rating: 3,
          deviation: 2,
          grade: 5.1,
          status: 'approved',
        }, {
          id: '123457',
          name: 'Rebekka Burri',
          role: 'TEC',
          rating: 3,
          deviation: 0,
          grade: 5.0,
          status: 'approved',
        }, {
          id: '123458',
          name: 'Martin Steiner',
          role: 'QM',
          rating: 1,
          deviation: 2,
          grade: 4.5,
          status: 'approved',
        }, {
          id: '123459',
          name: 'Bettina Rust',
          role: 'REQ',
          rating: 5,
          deviation: 0,
          grade: 6.0,
          status: 'approved',
        }, {
          id: '1234561',
          name: 'Andreas Lee',
          role: 'UM',
          rating: 5,
          deviation: 0,
          grade: 6.0,
          status: 'approved',
        }, {
          id: '1234562',
          name: 'Joel Dumont',
          role: 'REQ',
          rating: 4,
          deviation: 0,
          grade: 6.0,
          status: 'pending',
        }, {
          id: '1234563',
          name: 'Thierry Bill',
          role: 'IM',
          rating: 5,
          deviation: 0,
          grade: 6.0,
          status: 'approved',
        },
      ]}
      canSubmit
    />
  </div>
))
;
