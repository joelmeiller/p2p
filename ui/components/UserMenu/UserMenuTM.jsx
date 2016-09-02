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
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
          <Paper style={style.paper}>
            <Menu>
              <MenuItem primaryText={props.entry1} leftIcon={<Assessment />} />
              <MenuItem primaryText={props.entry2} leftIcon={<Grade />} />
              <MenuItem primaryText={props.entry3} leftIcon={<AccountBox />} />
              <MenuItem primaryText={props.entry4} leftIcon={<ExitToApp />} />
            </Menu>
          </Paper>
        </div>
      </div>
    </div>
        );
};

export default UserMenuTM;
