import React from 'react';

import TextField from 'material-ui/TextField';

const Inputfield = (props) => (
  <TextField
    defaultValue={props.defaultValue}
    hintText={props.hintText}
    name={props.name}
    value={props.value}
    fullWidth
  />
);

Inputfield.propTypes = {
  defaultValue: React.PropTypes.string,
  hintText: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default Inputfield;
