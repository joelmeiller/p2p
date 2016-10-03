import React from 'react';
import { withRouter } from 'react-router';

import { Menu, MenuItem, Divider } from 'material-ui';


const UserMenu = props => (
  <Menu>
    {props.menuItems.map((menuItem, i) => (
      menuItem.name ?
        <MenuItem
          key={i}
          primaryText={menuItem.name}
          leftIcon={menuItem.icon}
          disabled={menuItem.disabled}
          onTouchTap={() => props.router.push(menuItem.path)}
        /> :
        <Divider key={i} />
      )
    )}
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
  menuItems: React.PropTypes.array.isRequired,
};


export { menuItemProps };

export default withRouter(UserMenu);
