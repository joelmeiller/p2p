import React from 'react';

import TextField from 'material-ui/TextField';

import FontIcon from 'material-ui/FontIcon';

const AddCriteria = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <TextField
          hintText={props.hintText}
          fullWidth
        />
      </div>
      <div className="col-xs-6">
        <FontIcon className="material-icons">delete</FontIcon>
      </div>
    </div>
  </div>
);

AddCriteria.propTypes = {
  hintText: React.PropTypes.string,
};

export default AddCriteria;
