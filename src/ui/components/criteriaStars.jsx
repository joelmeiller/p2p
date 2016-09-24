//React Imports
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


const CriteriaStars = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6"><p>
          {props.textCriteria}</p></div>
      <div className="col-xs-6">
        <StarRatingComponent
          starCount={5}
          value={props.valueEffective}
          name={props.textCriteria}
          />
      </div>
    </div>
  </div>
);

CriteriaStars.propTypes = {
  valueEffective: React.PropTypes.number.isRequired,
  textCriteria: React.PropTypes.string.isRequired,
}

export default CriteriaStars;
