
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenuTM from './UserMenuTM.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::TM', () => (
  <div className="app flex-center-middle">
    <UserMenuTM
      entry1="Evaluation"
      entry2="My Rating"
      entry3="My Account"
      entry4="Logout"
      />
  </div>
))
;
