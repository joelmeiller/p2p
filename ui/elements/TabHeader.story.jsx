import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabHeader from './TabHeader.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('elements', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::TabHeader', () => (
  <div className="app flex-center-middle">
    <TabHeader
      members={[
        {
          label:"Michelle"
        }, {
          label:"Rebekka"
        }, {
          label:"Martin"
        }, {
          label:"Bettina"
        }, {
          label:"Andreas"
        }, {
          label:"Joel"
        }, {
          label:"Remo"
        }, {
          label:"Thierry"
        }
      ]}
      />
  </div>
))
;
