//React Imports
import React from 'react';

//Material Imports
import StarsRating2 from '../elements/starsV2.jsx';

const LabelStars = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-6"><p>
                {props.text}</p></div>
            <div className="col-xs-6">
              <StarsRating2
                name={props.name || props.text}
                value={props.stars}
                />
            </div>
          </div>
        </div>
      );
};

export default LabelStars;
