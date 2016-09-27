// React Imports
import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const Dropdown = props => (
  <DropDownMenu>
    {(() => (props.items ? props.items.map((item) =>
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.label}
      />) : undefined
    ))()}
  </DropDownMenu>
);


Dropdown.propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.object,
    })
  ),
  selectedValue: React.PropTypes.object,
};

export default Dropdown;
