// Node imports
import classNames from 'classnames';

// React Imports
import React from 'react';

import StarRatingComponent from 'react-star-rating-component';


const LabeledStarRating = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6">
        <p
          className={classNames({
            warning: !props.value,
          })}
        >{props.label}</p>
      </div>
      <div
        className={classNames('col-xs-6', 'star', {
          small: props.smallStars,
        })}
      >
        <StarRatingComponent
          starCount={5}
          value={props.value}
          name={props.id}
          onStarClick={props.onRatingChanged}
          editing={!props.readonly}
        />
      </div>
    </div>
  </div>
);


LabeledStarRating.propTypes = {
  value: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onRatingChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  smallStars: React.PropTypes.bool,
};


export default LabeledStarRating;
