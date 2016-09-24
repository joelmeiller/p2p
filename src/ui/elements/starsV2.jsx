import React from 'react';

import StarRatingComponent from 'react-star-rating-component';


// Note : props.name must be unique. Using the same props.name for different
//        StarsRating2 will result in the ratings to be "connected".

const StarsRating2 = (props) => (
  <StarRatingComponent
    starCount={5}
    value={props.value}
    name={props.name}
  />
);

StarsRating2.propTypes = {
  value: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
}

export default StarsRating2;
