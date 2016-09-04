import React from 'react';

import MemberProgress from './MemberProgress.jsx';

const ProgressPage = (props) => {
  return (
    <div className="container">
      { // <-- needed to execute code as javascript
        props.progress.map(function(memberProgress) {
          return (
            <div class="row">
              <div className="col-xs-12" style={{marginBottom:30}}>
                <MemberProgress
                  name={memberProgress.name}
                  role={memberProgress.role}
                  progress={memberProgress.progress}
                  />
              </div>
            </div>
          )}
        )
      }
    </div>
  );
};

export default ProgressPage;
