// React Imports
import React from 'react';

// Material Imports
import Inputfield from '../elements/Inputfield.jsx';
import Header3 from '../elements/Header/Header3.jsx';

const H3Input = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 h3-padding">
          <Header3
            myTitle={props.myTitle}
          />
        </div>
        <div className="col-xs-12 h3-line-width">
          <Inputfield
            value={props.value}
            hintText={props.hintText}
          />
        </div>
      </div>
    </div>
  );
};

Inputfield.propTypes = {
  hintText: React.PropTypes.string,
};

export default H3Input;
