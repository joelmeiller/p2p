
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenuQM from './UserMenuQM.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::QM', () => (
  <div className="app flex-center-middle">
    <UserMenuQM
      entry1="Dashboard"
      entry2="Evaluation"
      entry3="Teammembers"
      entry4="Criteria"
      entry5="Project Settings"
      entry6="My Account"
      entry7="Logout"
      />
  </div>
))
;
