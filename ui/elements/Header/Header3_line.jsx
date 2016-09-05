// React Imports
import React from 'react';

// Material Imports
import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

const Header3_line = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6"><h3>
          {props.myTitle}</h3>
        </div><hr className="blue" />
      </div>
    </div>
    );
  };

export default Header3_line;
