import React from 'react';

import Checkbox from 'material-ui/Checkbox';


const LabelCheckbox = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <p>{props.text}</p></div>
      <div className="col-xs-6">
        <Checkbox />
      </div>
    </div>
  </div>
);

LabelCheckbox.propTypes = {
  text: React.PropTypes.string,
};

export default LabelCheckbox;
