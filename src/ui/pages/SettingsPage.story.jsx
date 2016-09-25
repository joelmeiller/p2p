import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SettingsPage from './SettingsPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('-SettingsPage', () => (
  <div className="app flex-center-middle">
    <SettingsPage
      title="Project Settings"
      entries={[
        {
          title:"Show Remarks of each member"
        }, {
          title:"Shows the name of the teammmember anonymized"
        }
      ]}
      />
  </div>
))
;
