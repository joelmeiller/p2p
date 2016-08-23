// React Imports
import React from 'react';

// Material Imports
import InputMichelle from '../elements/inputfield.jsx';
import Header3 from '../elements/Header/Header3.jsx';

const H3Input = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 h3-padding">
          <Header3
            myTitle={props.h3Title}
          />
        </div>
        <div className="col-xs-12 h3-line-width">
          <InputMichelle
            hintText={props.labelHint}
          />
        </div>
      </div>
    </div>
  );
};

InputMichelle.propTypes = {
  labelHint: React.PropTypes.string,
};

export default H3Input;
