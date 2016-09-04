import React from 'react';

import ProgressBar from '../elements/ProgressBar.jsx';

const MemberProgress = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-2">
          <p>
            {props.name}, {props.role}
          </p>
        </div>
        <div className="col-xs-8 progress-margin-top">
          <ProgressBar
            value={props.progress}/>
        </div>
        <div className="col-xs-2">
          <p>
            {props.progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TMProgress;
