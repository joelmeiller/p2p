import React from 'react';

import ProgressBar from '../elements/ProgressBar.jsx';

const MemberProgress = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-2">
        <p>
          {props.name}, {props.role}
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
  role: React.PropTypes.string,
  progress: React.PropTypes.number,
};

export default MemberProgress;
