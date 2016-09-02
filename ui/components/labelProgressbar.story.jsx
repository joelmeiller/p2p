
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TMProgress from './labelProgressbar.jsx';

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
    <TMProgress
      nameTM="Michelle Andrey"
      roleTM="QM"
      progress={45}/>
  </div>
))
;
