
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import H2Progress from './h2Progressbar.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/LabelProgressbar', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))

.add('::H2', () => (
  <div className="app flex-center-middle">
    <H2Progress
      h2titleName="Michelle Andrey"
      h2RoleName="QM"
      progress={45}/>
  </div>
))
;
