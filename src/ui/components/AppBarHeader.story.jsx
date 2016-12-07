
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppBarHeader from './AppBarHeader.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/AppBarHeader', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::header', () => (
  <div className="app flex-center-middle">
    <AppBarHeader
      project={{
        title: "IP4: KLAV",
      }}
    />
  </div>
))
;
