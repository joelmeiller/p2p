import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavIcon from 'material-ui/svg-icons/navigation/menu';
import UserMenu from './UserMenu/UserMenu.jsx';

const AppBarHeader = props => (
  <AppBar
    title={props.title}
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
        <UserMenu menuItems={props.menuItems} />
      </IconMenu>
    }
  />
);

AppBarHeader.propTypes = {
  title: React.PropTypes.string,
  menuItems: React.PropTypes.array,
};


export default AppBarHeader;
