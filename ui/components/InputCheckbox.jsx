// React Imports
import React from 'react';

// Material Imports
import InputMichelle from '../elements/inputfield.jsx';
import FontIcon from 'material-ui/FontIcon';


const InputCheckbox = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6">
          <InputMichelle
            hintText={props.hintTextMichelle}
          />
        </div>
        <div className="col-xs-6">
          <FontIcon className="material-icons">delete</FontIcon>
        </div>
      </div>
    </div>
  );
};

InputCheckbox.propTypes = {
  hintTextMichelle: React.PropTypes.string,
};

export default InputCheckbox;
