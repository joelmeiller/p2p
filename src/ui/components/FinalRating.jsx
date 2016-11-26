import React from 'react';

import StarsRating from '../elements/StarsRating.jsx';
import Header2 from '../elements/Header/Header2.jsx';

const FinalRating = props => (
  <div className="flex">
    <Header2
      className="title-left"
      title={
        <span>{`${props.text}:`}
          <span className="push-left-small">{props.value}</span>
        </span>
      }
    />
    <StarsRating
      value={props.value}
      name={'finalRating'}
      readonly
    />
  </div>
);

FinalRating.propTypes = {
  text: React.PropTypes.string,
  value: React.PropTypes.number,
};

export default FinalRating;
