// React Imports
import React from 'react';
import TextTruncate from 'react-text-truncate';


import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const Dropdown = props => (
  <DropDownMenu
    onChange={(event, index, value) => props.onChange(value)}
    value={props.selectedValue}
  >
    {(() => (props.items ? props.items.map((item, i) =>
      <MenuItem
        key={i}
        value={item.id}
        primaryText={
          <TextTruncate
            line={1}
            truncateText={'...'}
            text={item.label}
          />
        }
      />) : undefined
    ))()}
  </DropDownMenu>
);


Dropdown.propTypes = {
  selectedValue: React.PropTypes.string,
  onChange: React.PropTypes.func,
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string,
    })
  ),
};

export default Dropdown;
