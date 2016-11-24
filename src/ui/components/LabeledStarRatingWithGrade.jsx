// Node imports
import classNames from 'classnames';

// React imports
import React from 'react';

import TextField from 'material-ui/TextField';

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
        <div className="col-xs-3">
          <p
            className={classNames('pull-top-small', {
              warning: props.deviationWarning,
            })}
          >
            <span className="prefix">Abweichung:</span>
            <span className="pull-top-small" style={{ width: 40 }}>
              <TextField
                name={props.id}
                defaultValue={props.deviation}
                onChange={(e) => { if (props.onChanged) props.onChanged(e.target.value); }}
                disabled={props.readonly}
                inputStyle={{ color: '#333333', width: 40 }}
              />
            </span>
          {/*props.deviation > 0 ? '+' : ''}{props.deviation*/}
          </p>
        </div>
        <div className="col-xs-1">
          <p><span className="prefix">Note<sup>*</sup>:</span>{props.grade}</p>
        </div>
      </div> :
      <div className="col-xs-6">
        {(props.removed ?
          <p>-</p> :
          <p><span className="prefix">Progress:</span>{props.progress} %</p>
        )}
      </div>
    )}
  </div>
);

LabeledStarRatingWithGrade.propTypes = {
  id: React.PropTypes.string,
  deviation: React.PropTypes.number,
  deviationWarning: React.PropTypes.bool,
  grade: React.PropTypes.number,
  rating: React.PropTypes.number,
  isFinal: React.PropTypes.bool,
  onChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  removed: React.PropTypes.bool,
  progress: React.PropTypes.number,
  statusWarning: React.PropTypes.bool,
};

export default LabeledStarRatingWithGrade;
