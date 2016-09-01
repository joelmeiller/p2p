
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabelStars from './LabelStars.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::stars', () => (
  <div className="app flex-center-middle">
    <LabelStars
      textSontiges="Michelle Andrey, QM"
      starsTotalCount={5}
      valueEffective={3}    />
  </div>
))
;
