
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabeledStarRating from './LabeledStarRating.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::LabeledStarRating', () => (
  <div className="app flex-center-middle">
    <LabeledStarRating
      label="Weicht Konflikten aus"
      value={3}
      id="abc123"
      />
  </div>
))
;
