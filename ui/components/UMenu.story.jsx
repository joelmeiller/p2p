
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UMenu from './UMenu.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Menu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::user', () => (
  <div className="app flex-center-middle">
    <UMenu
      textSontiges="Kann eigene und fremde Anliegen..."
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
