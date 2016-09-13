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
import {blue500} from 'material-ui/styles/colors';

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
          name:"Projects",
          icon:<Dashboard color={blue500}/>
        }, {
          name:"Roles",
          icon:<Accessibility color={blue500}/>
        }, {
          name:"Criteria",
          icon:<List color={blue500}/>
        }, {
          name:"Project Settings",
          icon:<Settings color={blue500}/>
        }, {
          name:"Grading",
          icon:<Grade color={blue500}/>
        }, {
          name:"My Account",
          icon:<AccountBox color={blue500}/>
        }, {
          name:"Logout",
          icon:<ExitToApp color={blue500}/>
        },
      ]}
      />
</div>
));
