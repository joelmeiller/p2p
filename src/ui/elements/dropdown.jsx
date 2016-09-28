// React Imports
import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const Dropdown = props => (
  <DropDownMenu
    onChange={(event, index, value) => props.onChange(value)}
    value={props.selectedCriteriaId}
  >
    {(() => (props.items ? props.items.map((item, i) =>
      <MenuItem
        key={i}
        value={item.id}
        primaryText={item.label}
      />) : undefined
    ))()}
  </DropDownMenu>
);


Dropdown.propTypes = {
  selectedCriteriaId: React.PropTypes.string,
  handleChange: React.PropTypes.func,
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.object,
    })
  ),
};

export default Dropdown;
