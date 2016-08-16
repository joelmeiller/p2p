/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Header2 from './Header2.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


storiesOf('elements/Header', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::Header2', () => (
  <div className="app flex-center-middle">
    <Header2
    myTitle="Teammembers"
    />
  </div>
))
;
