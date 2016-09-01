
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppBarHeader from './appBar.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Bar', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::header', () => (
  <div className="app flex-center-middle">
    <AppBarHeader
      AppBarTitle="IP4: KLAV"
    />
  </div>
))
;
