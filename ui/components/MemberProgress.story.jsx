import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MemberProgress from './MemberProgress.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Progressbar', module)
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
      progress={45}/>
  </div>
));
