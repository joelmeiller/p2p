/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Header3_line from './Header3_line.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


storiesOf('elements/Header', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::Header3_line', () => (
  <div className="app flex-center-middle">
    <Header3_line
    myTitle="Teammembers"
    />
  </div>
))
;
