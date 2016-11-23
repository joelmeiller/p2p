// Node imports
import classNames from 'classnames';

// React imports
import React from 'react';

import LabeledStarRating from '../elements/LabeledStarRating.jsx';

const LabeledStarRatingWithGrade = props => (
  <div className="row">
    <div className="col-xs-6">
      <LabeledStarRating
        {...props}
      />
    </div>
    {(props.isFinal ?
      <div>
        <div className="col-xs-2">
          <p
            className={classNames('status', {
              warning: props.statusWarning,
            })}
          >
            <span className="prefix">Bewertung:</span>{props.rating > 0 ? props.rating : undefined}
          </p>
        </div>
        <div className="col-xs-2">
          <p
            className={classNames({
              warning: props.deviationWarning,
            })}
          >
            <span className="prefix">Abweichung:</span>{props.deviation > 0 ? '+' : ''}{props.deviation}
          </p>
        </div>
        <div className="col-xs-2">
          <p><span className="prefix">Note<sup>*</sup>:</span>{props.grade}</p>
        </div>
      </div> :
      <div className="col-xs-6">
        <p><span className="prefix">Progress:</span>{props.progress} %</p>
      </div>
    )}
  </div>
);

LabeledStarRatingWithGrade.propTypes = {
  studentId: React.PropTypes.string,
  deviation: React.PropTypes.number,
  deviationWarning: React.PropTypes.bool,
  grade: React.PropTypes.number,
  rating: React.PropTypes.number,
  isFinal: React.PropTypes.bool,
  progress: React.PropTypes.number,
  statusWarning: React.PropTypes.bool,
};

export default LabeledStarRatingWithGrade;
