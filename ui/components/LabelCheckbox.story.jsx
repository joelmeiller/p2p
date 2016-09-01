
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabelCheckbox from './labelCheckbox.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::checkbox', () => (
  <div className="app flex-center-middle">
    <LabelCheckbox
      textSontiges="Kann eigene und fremde Anliegen..."
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
