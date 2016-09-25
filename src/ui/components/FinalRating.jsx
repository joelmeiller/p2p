import React from 'react';

import StarsRating from '../elements/StarsRating.jsx';
import Header2 from '../elements/Header/Header2.jsx';

const FinalRating = props => (
  <div className="container flex">
    <Header2
      className="title-left"
      title={`${props.text} ${props.value}:`}
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
