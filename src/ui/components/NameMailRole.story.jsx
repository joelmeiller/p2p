import React from 'react';
import { storiesOf } from '@kadira/storybook';
import NameMailRole from './NameMailRole.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/NameMailRole', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::NameMailRole', () => (
  <div className="app flex-center-middle">
    <NameMailRole
      hintText="Name"
      hintText2="Mail"
      hintRole="Role"
      textRole="QM"
      selectedValue=""
      menuItems={[
        {
          label: 'Role',
          value: 'R',
        },
        {
          label: 'Quality Manager',
          value: 'QM',
        },
        {
          label: 'TEC Leader',
          value: 'TEC',
        },
        {
          label: 'Requirements Engineer',
          value: 'REQ',
        },
        {
          label: 'Usability Manager',
          value: 'UM',
        },
        {
          label: 'Information Manager',
          value: 'IM',
        },
        {
          label: 'Test Manager',
          value: 'Test',
        }
      ]}
      />
  </div>
))
;
