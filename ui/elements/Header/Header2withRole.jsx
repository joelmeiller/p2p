// React Imports
import React from 'react';

// Material Imports
import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

const Header2withRole = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6"><h2>
          {props.h2title}, {props.h2Role}</h2>
        </div>
      </div>
    </div>
    );
  };

export default Header2withRole;
