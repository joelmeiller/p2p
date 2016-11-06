// Node imports
import classNames from 'classnames';

// React imports
import React from 'react';

import ProgressBar from '../elements/ProgressBar.jsx';

const MemberProgress = props => (
  <div className="row">
    <div
      className={classNames('member', {
        disabled: props.removed,
      })}
    >
      <div className="col-xs-2">
        <p
          className={classNames({
            warning: props.statusWarning,
          })}
        >
          {props.name}, {props.activeRole}
        </p>
      </div>
      <div className="col-xs-8 progress-margin-top">
        <ProgressBar
          value={props.progress}
        />
      </div>
      <div className="col-xs-2">
        <p>
          {props.progress}%
        </p>
      </div>
    </div>
  </div>
);

MemberProgress.propTypes = {
  name: React.PropTypes.string,
  activeRole: React.PropTypes.string,
  progress: React.PropTypes.number,
  statusWarning: React.PropTypes.bool,
  removed: React.PropTypes.bool,
};

export default MemberProgress;
