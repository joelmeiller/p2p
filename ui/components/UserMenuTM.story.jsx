
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenuTM from './userMenuTM.jsx';

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
      />
  </div>
))
;
