// Node imports
import classNames from 'classnames';

// React imports
import React from 'react';

import TextField from 'material-ui/TextField';

import LabeledStarRating from '../elements/LabeledStarRating.jsx';


const LabeledStarRatingWithGrade = props => (
  <div className="row">
    <div
      className="col-xs-6"
      onClick={() => (props.isFinal ? props.onSelectMember() : undefined)}
    >
      <LabeledStarRating
        {...props}
        readonly
      />
    </div>
    {(props.isFinal || props.isAccepted ?
      <div>
        <div className="col-xs-4">
          <div className="row">
            <div className="col-xs-4">
              <p
                className={classNames({
                  warning: props.ratingWarning,
                })}
              >
                {props.rating > 0 ? props.rating : undefined}
              </p>
            </div>
            <div
              className={classNames('col-xs-5', {
                warning: props.deviationWarning,
              })}
            >
              <TextField
                name={props.id}
                className="pull-top-small push-left-mini"
                defaultValue={props.deviation}
                onChange={(e) => {
                  if (props.onChanged) props.onChanged(e.target.value);
                }}
                disabled={props.readonly}
                style={{ width: '60px' }}
                inputStyle={{ color: '#333333' }}
                children={
                  <input
                    name={props.id}
                    type="number"
                    step="0.01"
                    defaultValue={props.deviation}
                  />
                }
              />
            </div>
            <div className="col-xs-3">
              <p>{props.grade}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-2">
          <p
            className={classNames({
              warning: props.statusWarning,
              success: props.statusSuccess,
            })}
          >
            {props.status}
          </p>
        </div>
      </div> :
      <div className="col-xs-6">
        {(props.removed ?
          <p>-</p> :
          {/* TODO: i18n */}
          <p><span className="prefix">Progress:</span>{props.progress} %</p>
        )}
      </div>
    )}
  </div>
);

LabeledStarRatingWithGrade.propTypes = {
  deviation: React.PropTypes.number,
  deviationWarning: React.PropTypes.bool,
  grade: React.PropTypes.number,
  id: React.PropTypes.string,
  isFinal: React.PropTypes.bool,
  onChanged: React.PropTypes.func,
  progress: React.PropTypes.number,
  rating: React.PropTypes.number,
  ratingWarning: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  removed: React.PropTypes.bool,
  status: React.PropTypes.string,
  statusWarning: React.PropTypes.bool,
};

export default LabeledStarRatingWithGrade;
