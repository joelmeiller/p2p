//React Imports
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


const LabeledStarRating = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6"><p>
          {props.label}</p></div>
      <div className="col-xs-6">
        <StarRatingComponent
          starCount={5}
          value={props.value}
          name={props.id}
          onStarClick={props.onRatingChanged}
          />
      </div>
    </div>
  </div>
);

LabeledStarRating.propTypes = {
  value: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onRatingChanged: React.PropTypes.func,
}

export default LabeledStarRating;
