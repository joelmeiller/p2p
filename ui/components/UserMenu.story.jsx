
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenu from './UserMenu.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::UserMenu', () => (
  <div className="app flex-center-middle">
    <UserMenu
      firstLabel="Evaluation"
      secondLabel="My Rating"
      thirdLabel="My Account"
      fourthLabel="Logout"
      />
  </div>
))
;
