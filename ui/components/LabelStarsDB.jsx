import React from 'react';

import StarsRating2 from '../elements/starsV2.jsx';

const LabelStarsDB = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-2">
          <p>{props.text}</p>
        </div>
        <div className="row">
          <div className="col-xs-3" style={{marginTop:-11}}>
            <StarsRating2
              name={props.name || props.text}
              value={props.stars}
              />
          </div>
          <div className="col-xs-2">
            <p>{props.deviation}</p>
          </div>
          <div className="col-xs-2">
            <p>{props.grade}</p>
          </div>
          <div className="col-xs-2">
            <p>{props.status}</p>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default LabelStarsDB;
