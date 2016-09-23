// React Imports
import React from 'react';

// Material Imports
import Inputfield from '../elements/inputfield.jsx';
import Header3 from '../elements/Header/Header3.jsx';

const H3Input = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 h3-padding">
          <Header3
            myTitle={props.title}
          />
        </div>
        <div className="col-xs-12 h3-line-width">
          <Inputfield
            hintText={props.hintText}
            name={props.name}
            value={props.value}
          />
        </div>
      </div>
    </div>
  );
};

Inputfield.propTypes = {
  hintText: React.PropTypes.string,
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default H3Input;
