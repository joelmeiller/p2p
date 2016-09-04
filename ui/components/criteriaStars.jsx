//React Imports
import React from 'react';

//Material Imports
import StarsRating2 from '../elements/starsV2.jsx';

const CriteriaStars = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-6"><p>
                {props.textCriteria}</p></div>
            <div className="col-xs-6">
              <StarsRating2
                value={props.valueEffective}
                name={props.textCriteria}
                />
            </div>
          </div>
        </div>
      );
};

export default CriteriaStars;
