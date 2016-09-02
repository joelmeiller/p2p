import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Grade from 'material-ui/svg-icons/action/grade';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Assessment from 'material-ui/svg-icons/action/assessment';

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

const UserMenuTM = (props) => {
      return (
        <div>
          <Paper style={style.paper}>
            <Menu>
              <MenuItem primaryText="Evaluation" leftIcon={<Assessment />} />
              <MenuItem primaryText="My Rating" leftIcon={<Grade />} />
              <MenuItem primaryText="My Account" leftIcon={<AccountBox />} />
              <MenuItem primaryText="Logout" leftIcon={<ExitToApp />} />

            </Menu>
          </Paper>
        </div>
        );
};

export default UserMenuTM;
