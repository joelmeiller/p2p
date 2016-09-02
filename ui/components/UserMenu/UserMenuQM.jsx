import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Accessibility from 'material-ui/svg-icons/action/accessibility';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Grade from 'material-ui/svg-icons/action/grade';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';

import FontIcon from 'material-ui/FontIcon';



const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const UserMenuQM = (props) => {
      return (
        <div>
          <Paper style={style.paper}>
            <Menu>
              <MenuItem primaryText="Dashboard" leftIcon={<Dashboard />} />
              <MenuItem primaryText="Evaluation" leftIcon={<Grade />} />
              <MenuItem primaryText="Teammembers" leftIcon={<Accessibility />} />
              <MenuItem primaryText="Criteria" leftIcon={<List />} />
              <MenuItem primaryText="Project Settings" leftIcon={<Settings />} />
              <MenuItem primaryText="My Account" leftIcon={<AccountBox />} />
              <MenuItem primaryText="Logout" leftIcon={<ExitToApp />} />

            </Menu>
          </Paper>
        </div>
        );
};

export default UserMenuQM;
