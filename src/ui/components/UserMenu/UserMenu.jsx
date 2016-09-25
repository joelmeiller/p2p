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

const menuItemProps = {
  key: React.PropTypes.string,
  primaryText: React.PropTypes.string,
  leftIcon: React.PropTypes.element,
};

UserMenu.propTypes = {
  menuItems: React.PropTypes.arrayOf(
    React.PropTypes.shape(menuItemProps)
  ).isRequired,
};


export { menuItemProps };

export default withRouter(UserMenu);
