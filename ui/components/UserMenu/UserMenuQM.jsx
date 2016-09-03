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
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Paper style={style.paper}>
                <Menu>
                  <MenuItem primaryText={props.entry1} leftIcon={<Dashboard />} />
                  <MenuItem primaryText={props.entry2} leftIcon={<Grade />} />
                  <MenuItem primaryText={props.entry3} leftIcon={<Accessibility />} />
                  <MenuItem primaryText={props.entry4} leftIcon={<List />} />
                  <MenuItem primaryText={props.entry5} leftIcon={<Settings />} />
                  <MenuItem primaryText={props.entry6} leftIcon={<AccountBox />} />
                  <MenuItem primaryText={props.entry7} leftIcon={<ExitToApp />} />
                </Menu>
              </Paper>
            </div>
          </div>
        </div>
        );
};

export default UserMenuQM;
