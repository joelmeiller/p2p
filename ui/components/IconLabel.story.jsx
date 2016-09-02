
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import IconLabel from './IconLabel.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::icon', () => (
  <div className="app flex-center-middle">
    <IconLabel
      labelMenu="Dashboard"
      />
  </div>
))
;
