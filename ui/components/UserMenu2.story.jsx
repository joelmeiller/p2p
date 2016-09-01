
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MenuExampleIcons from './UserMenu2.jsx';

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
    <MenuExampleIcons

      />
  </div>
))
;
