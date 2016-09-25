import React from 'react';

import StarRatingComponent from 'react-star-rating-component';


// Note : props.name must be unique. Using the same props.name for different
//        StarsRating will result in the ratings to be "connected".

const StarsRating = props => (
  <StarRatingComponent
    starCount={5}
    value={props.value}
    name={props.name}
  />
);

StarsRating.propTypes = {
  value: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
};

export default StarsRating;
