import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';


import UserMenuByRole from './menu/UserMenuByRole.jsx';


const AppBarHeader = props => (
  <AppBar
    title={props.project ? props.project.title : 'Projects'}
    zDepth={0}
    titleStyle={{
      fontSize: '2.5rem',
      fontWeight: 'lighter',
    }}
    iconElementLeft={
      <IconMenu
        iconButtonElement={
          <IconButton><NavIcon className="nav-icon" /></IconButton>
        }
      >
        <UserMenuByRole {...props.user} />
      </IconMenu>
    }
    iconElementRight={
      <FlatButton
        label={props.username}
        labelStyle={{
          fontWeight: 'lighter',
        }}
      />
    }
  />
);


AppBarHeader.propTypes = {
  project: React.PropTypes.object,
  user: React.PropTypes.object,
  username: React.PropTypes.string,
};

AppBarHeader.defaultProps = {
  username: '-',
};


export default AppBarHeader;
