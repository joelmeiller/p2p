import React from 'react';
import { withRouter } from 'react-router';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const UserMenu = props => (
  <Menu>
    {props.menuItems.map(item =>
      <MenuItem
        key={item.name}
        primaryText={item.name}
        leftIcon={item.icon}
        onTouchTap={() => props.router.push(item.path)}
      />
    )}
  </Menu>
);

UserMenu.propTypes = {
  menuItems: React.PropTypes.array.isRequired,
};

export default withRouter(UserMenu);
