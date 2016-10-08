import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditProjectPage from './EditProjectPage.jsx';


storiesOf('pages/EditProjectPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::edit', () => (
  <div className="app flex-center-middle">
    <EditProjectPage
      hintText="Name"
      hintText2="Coach"
      selectedValue=""
      menuItems={[
        {
          label: 'Open',
          value: 'O',
        },
        {
          label: 'Close',
          value: 'C',
        }
      ]}
      />
  </div>
))
;
