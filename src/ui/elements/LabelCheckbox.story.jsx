
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LabelCheckbox from './LabelCheckbox.jsx';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::checkbox', () => (
  <div className="app flex-center-middle">
    <LabelCheckbox
      text="Kann eigene und fremde Anliegen..."
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
