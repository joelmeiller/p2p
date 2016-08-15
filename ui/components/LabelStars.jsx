//React Imports
import React from 'react';

//Material Imports
import StarsRating2 from '../elements/starsV2.jsx';

const LabelStars = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-6"><p>
                {props.textSontiges}</p></div>
            <div className="col-xs-6"><StarsRating2
              starCount={props.starsTotalCount}
              value={props.valueEffective}
              />
            </div>
          </div>
        </div>
      );
};

export default LabelStars;
