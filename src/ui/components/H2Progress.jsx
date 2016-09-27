import React from 'react';

import ProgressBar from '../elements/ProgressBar.jsx';
import Header2withRole from '../elements/Header/Header2withRole.jsx';

const H2Progress = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-4 header2-margin-top">
          <Header2withRole
            h2title={props.name}
            h2Role={props.role}/>
        </div>
        <div className="col-xs-6 progress-margin-top">
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

H2Progress.propTypes = {
  name: React.PropTypes.string,
  role: React.PropTypes.string,
  progress: React.PropTypes.number,
};

export default H2Progress;
