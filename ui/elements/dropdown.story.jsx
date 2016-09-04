import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dropdown from './Dropdown.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


storiesOf('elements', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::Dropdown', () => (
  <div className="app flex-center-middle">
    <Dropdown
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
