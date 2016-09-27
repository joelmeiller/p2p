import React from 'react';
import { withRouter } from 'react-router';

import { Menu, MenuItem } from 'material-ui';


const UserMenu = props => (
  <Menu>
    {props.menu.map(division => (
      division.menuItems.map(item => (
        <MenuItem
          key={item.name}
          primaryText={item.name}
          leftIcon={item.icon}
          disabled={item.disabled}
          onTouchTap={() => props.router.push(item.path)}
        />
      ))
    ))}
  </Menu>
);

const menuItemProps = {
  key: React.PropTypes.string,
  primaryText: React.PropTypes.string,
  leftIcon: React.PropTypes.element,
  disabled: React.PropTypes.bool,
  path: React.PropTypes.string,
};

UserMenu.propTypes = {
  menu: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      menuItems: React.PropTypes.arrayOf(React.PropTypes.shape(menuItemProps)),
    })
  ).isRequired,
};


export { menuItemProps };

export default withRouter(UserMenu);
