
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenuCoach from './UserMenuCoach.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::Coach', () => (
  <div className="app flex-center-middle">
    <UserMenuCoach
      entry1="Dashboard"
      entry2="Roles"
      entry3="Criteria"
      entry4="Project Settings"
      entry5="Grading"
      entry6="My Account"
      entry7="Logout"
      />
  </div>
))
;
