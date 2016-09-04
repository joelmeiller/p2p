import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UserMenu from './UserMenu.jsx';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';
import Grade from 'material-ui/svg-icons/action/grade';

import FontIcon from 'material-ui/FontIcon';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/UserMenu', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::Coach', () => (
  <div className="app flex-center-middle">
    <UserMenu
      entries={[
        {
          name:"Dashboard",
          icon:<Dashboard />
        }, {
          name:"Roles",
          icon:<Accessibility />
        }, {
          name:"Criteria",
          icon:<List />
        }, {
          name:"Project Settings",
          icon:<Settings />
        }, {
          name:"Grading",
          icon:<Grade />
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
