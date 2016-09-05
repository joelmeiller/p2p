
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import InputCheckbox from './InputCheckbox.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Input', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::icon', () => (
  <div className="app flex-center-middle">
    <InputCheckbox
      hintText="Criteria"
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
