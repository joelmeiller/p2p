//React Imports
import React from 'react';

//Material Imports
import ProgressMichelle from '../elements/progressbar.jsx';
import Header2withRole from '../elements/Header/Header2withRole.jsx';

const H2Progress = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-4 header2-margin-top">
              <Header2withRole
                h2title={props.h2titleName}
                h2Role={props.h2RoleName}/>
            </div>
            <div className="col-xs-6 progress-margin-top">
              <ProgressMichelle
                valueProgress={props.progress}/>
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

export default H2Progress;
