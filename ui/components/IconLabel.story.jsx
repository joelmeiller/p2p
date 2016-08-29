
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import IconLabel from './IconLabel.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/IconLabel', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::IconLabel', () => (
  <div className="app flex-center-middle">
    <IconLabel
      labelMenu="Dashboard"
      />
  </div>
))
;
