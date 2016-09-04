//React Imports
import React from 'react';

//Material Imports
import StarsRating2 from '../elements/starsV2.jsx';
import Header2 from '../elements/Header/Header2.jsx';

const FinalRating = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 flex-align-middle">
          <div>
            <Header2 h2title={'Your final rating is ' + props.finalRating + ':'} />
          </div>
          <div>
            <StarsRating2
              value={props.finalRating}
              name={'finalRating'}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalRating;
