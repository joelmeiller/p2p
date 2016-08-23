
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import H3Input from './H3Input.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Input', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::h3', () => (
  <div className="app flex-center-middle">
    <H3Input
      h3Title="Bewertungen und mögliche Verbesserungsvorschläge:"
      labelHint="Das Mitglied hat sich..."
    />
  </div>
))
;
