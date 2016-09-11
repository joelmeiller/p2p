
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import NameMailRole from './NameMailRole.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Form', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}Î
  </MuiThemeProvider>
))
.add('::NameMailRole', () => (
  <div className="app flex-center-middle">
    <NameMailRole
      hintText="Name"
      hintText2="Mail"
      hintRole="Role"
      textRole="QM"
    />
  </div>
))
;
