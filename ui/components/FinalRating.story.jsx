
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FinalRating from './FinalRating.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::FinalRating', () => (
  <div className="app flex-center-middle">
    <FinalRating
      finalRating={3}
      />
  </div>
))
;
