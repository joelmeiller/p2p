
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabelStars from './LabelStars.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/LabelStars', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <LabelStars
      text="Michelle Andrey, QM"
      stars={3}
      />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <LabelStars
      text="Michelle Andrey, QM"
      stars={0}
      />
  </div>
))
;
