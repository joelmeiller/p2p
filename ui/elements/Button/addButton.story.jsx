/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import addButton from './addButton.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('elements/Button', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::add', () => (
  <div className="app flex-center-middle">
    <addButton
    add="Im a button"
    />
  </div>
))
;
