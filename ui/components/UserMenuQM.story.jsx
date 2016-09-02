
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
      />
  </div>
))
;
