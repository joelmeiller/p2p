// React Imports
import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const Dropdown = (props) => {
  console.log(props);
  return (
    <div>
      <DropDownMenu value={props.selectedValue} onChange={props.handleChange}>
        {(() => (props.menuItems ? props.menuItems.map((item) =>
          <MenuItem key={item.value} value={item.value} primaryText={item.label} />) : undefined
        ))()}
      </DropDownMenu>
    </div>
  );
};

Dropdown.propTypes = {
  menuItems: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string,
    })
  ),
  selectedValue: React.PropTypes.string,
  handleChange: React.PropTypes.func,
};

export default Dropdown;
