import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MemberProgress from './MemberProgress.jsx';

storiesOf('components/MemberProgress', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

.add('::basic', () => (
  <div className="app flex-center-middle">
    <MemberProgress
      name="Michelle Andrey"
      role="QM"
      progress={70}
    />
  </div>
))
.add('::warning', () => (
  <div className="app flex-center-middle">
    <MemberProgress
      name="Michelle Andrey"
      role="QM"
      progress={45}
      statusWarning
    />
  </div>
))
;
