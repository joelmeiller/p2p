import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

const Header2_line = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6"><h2>
          {props.myTitle}</h2>
      </div><hr className="blue" />
      </div>
    </div>
    );
  };

export default Header2_line;
