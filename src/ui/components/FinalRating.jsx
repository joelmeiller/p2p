import React from 'react';

import StarsRating from '../elements/StarsRating.jsx';
import Header2 from '../elements/Header/Header2.jsx';

const FinalRating = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 flex-align-middle">
          <div className="title-left">
            <Header2 h2title={'Your final rating is ' + props.finalRating + ':'} />
          </div>
          <div>
            <StarsRating
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
