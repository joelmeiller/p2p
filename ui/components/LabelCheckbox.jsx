//React Imports
import React from 'react';

//Material Imports
import CheckboxMichelle from '../elements/checkbox.jsx';

const LabelCheckbox = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-6"><p>
                {props.textSontiges}</p></div>
            <div className="col-xs-6"><CheckboxMichelle
                label={props.checkboxLabel}/></div>
          </div>
        </div>
      );
};

export default LabelCheckbox;
