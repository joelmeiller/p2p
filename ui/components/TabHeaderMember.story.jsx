import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabHeaderMember from './TabHeaderMember.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/AppBarHeader', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::TabHeaderMember', () => (
  <div className="app flex-center-middle">
    <TabHeaderMember
      title="IP4: KLAV"
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
