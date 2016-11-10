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
    <div className="col-xs-2">
      <p
        className={classNames({
          warning: props.deviationWarning,
        })}
      ><span className="prefix">Deviation:</span>{props.deviation > 0 ? '+' : ''}{props.deviation}</p>
    </div>
    <div className="col-xs-2">
      <p><span className="prefix">Grade:</span>{props.grade}</p>
    </div>
    <div className="col-xs-2">
      <p
        className={classNames('uppercase', 'bold', 'status', {
          warning: props.statusWarning,
        })}
      >{props.status}</p>
    </div>
  </div>
);

LabeledStarRatingWithGrade.propTypes = {
  deviation: React.PropTypes.number,
  deviationWarning: React.PropTypes.bool,
  grade: React.PropTypes.number,
  status: React.PropTypes.string,
  statusWarning: React.PropTypes.bool,
};

export default LabeledStarRatingWithGrade;
