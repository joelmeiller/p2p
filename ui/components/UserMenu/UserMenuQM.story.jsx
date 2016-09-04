import React from 'react';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Grade from 'material-ui/svg-icons/action/grade';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';

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
.add('::QM', () => (
  <div className="app flex-center-middle">
    <UserMenu
      entries={[
        {
          name:"Dashboard",
          icon:<Dashboard />
        }, {
          name:"Evaluation",
          icon:<Grade />
        }, {
          name:"Teammembers",
          icon:<Accessibility />
        }, {
          name:"Criteria",
          icon:<List />
        }, {
          name:"Project Settings",
          icon:<Settings />
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
