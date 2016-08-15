//React Imports
import React from 'react';

//Material Imports
import CheckboxMichelle from '../elements/checkbox.jsx';
import InputMichelle from '../elements/inputfield.jsx';
//import ic_delete_24px.svg from material-design-icons/action/svg/design;


const InputCheckbox = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <InputMichelle
              hintText={props.hintTextMichelle}/>
            </div>
            <div className="col-xs-6">
            <i class="material-icons delete">face</i>
            </div>
          </div>
        </div>
      );
};

export default InputCheckbox;
