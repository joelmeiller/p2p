import React from 'react';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import List from 'material-ui/svg-icons/action/list';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Assessment from 'material-ui/svg-icons/action/assessment';

import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import UserMenu from './UserMenu.jsx';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::TM', () => (
  <div className="app flex-center-middle">
    <UserMenu
      entries={[
        {
          name:"Evaluation",
          icon:<List />
        }, {
          name:"My Ratings",
          icon:<Assessment />
        }, {
          name:"My Account",
          icon:<AccountBox />
        }, {
          name:"Logout",
          icon:<ExitToApp />
        },
      ]}
      />
</div>
));
