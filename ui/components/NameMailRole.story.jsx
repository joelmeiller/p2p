
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
.add('::Line', () => (
  <div className="app flex-center-middle">
    <NameMailRole
      hintName="Name"
      textName="Michelle Andrey"
      hintMail="Mail"
      textMail="michelle.andreyatstudents.fhnw.ch"
      hintRole="Role"
      textRole="QM"
    />
  </div>
))
;
