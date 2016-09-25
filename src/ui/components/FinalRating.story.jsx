
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FinalRating from './FinalRating.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/FinalRating', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.addWithInfo('::Specification', '', () => (
  <FinalRating
    text="Your final rating is"
    value={3}
  />),
  { inline: true }
)
;
