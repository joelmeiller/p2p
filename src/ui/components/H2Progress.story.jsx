
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import H2Progress from './H2Progress.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Progressbar', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

.add('::header', () => (
  <div className="app flex-center-middle">
    <H2Progress
      h2titleName="Michelle Andrey"
      h2RoleName="QM"
      progress={45}/>
  </div>
))
;
