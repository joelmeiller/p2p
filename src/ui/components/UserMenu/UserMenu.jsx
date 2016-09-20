import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

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

const UserMenu = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Paper style={style.paper}>
            <Menu>
            {(() => (props.entries ? props.entries.map((entry) =>
                  <MenuItem primaryText={entry.name} leftIcon={entry.icon}/>
            ) : undefined))()}
          </Menu>
        </Paper>
      </div>
    </div>
  </div>
);
};

export default UserMenu;
