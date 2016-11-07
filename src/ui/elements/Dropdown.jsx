// React Imports
import React from 'react';
import TextTruncate from 'react-text-truncate';


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const Dropdown = props => (
  <SelectField
    onChange={(event, index, value) => props.onChange(value)}
    value={props.selectedValue}
    disabled={props.readonly}
    iconStyle={{ right: 0 }}
    labelStyle={{ fontSize: '14px', paddingLeft: 0, paddingRight: '24px' }}
    underlineStyle={{ margin: '0px -3px' }}
    style={{ width: '100%' }}
  >
    {(() => (props.items ? props.items.map((item, i) =>
      <MenuItem
        key={i}
        value={item.id}
        primaryText={(
          item.disabled ?
            <span className="option-disabled">{item.label}</span> :
            <TextTruncate
              line={1}
              truncateText={'...'}
              text={item.label}
            />
        )}
      />) : undefined
    ))()}
  </SelectField>
);


Dropdown.propTypes = {
  selectedValue: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string,
    })
  ),
};

export default Dropdown;
