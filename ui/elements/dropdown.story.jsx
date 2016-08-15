/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DropdownMichelle from './dropdown.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


storiesOf('elements/DropdownMichelle', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::standard', () => (
  <div className="app flex-center-middle">
    <DropdownMichelle
      selectedValue="test_1"
      menuItems={[
        {
          label: 'Test 1',
          value: 'test_1',
        },
        {
          label: 'Test 2',
          value: 'test_2',
        },
      ]}
      onChange={() => console.log('Changed to')}
    />
  </div>
))

;
