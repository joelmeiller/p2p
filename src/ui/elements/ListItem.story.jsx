
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ListItem from './ListItem.jsx';


storiesOf('elements/ListItem', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <ListItem
      text="Kommunikation im Team"
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <ListItem
      text="Kommunikation im Team"
      readonly
    />
  </div>
))
.add('::self', () => (
  <div className="app flex-center-middle">
    <ListItem
      text="Kommunikation im Team"
      self
    />
  </div>
))
.add('::self & readonly', () => (
  <div className="app flex-center-middle">
    <ListItem
      text="Kommunikation im Team"
      self
      readonly
    />
  </div>
))
;
