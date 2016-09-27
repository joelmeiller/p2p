import React from 'react';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Assessment from 'material-ui/svg-icons/action/assessment';

import { blue500 } from 'material-ui/styles/colors';

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
      menuItems={[
        {
          name: 'Progress',
          icon: <Dashboard color={blue500} />,
          disabled: true,
        }, {
          name: 'My Ratings',
          icon: <Assessment color={blue500} />,
        }, {
          name: 'My Account',
          icon: <AccountBox color={blue500} />,
        }, {
          name: 'Logout',
          icon: <ExitToApp color={blue500} />,
        },
      ]}
    />
  </div>
));
