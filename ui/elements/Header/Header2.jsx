// React Imports
import React from 'react';

// Material Imports
import injectTapEventPlugin from 'react-tap-event-plugin';

//injectTapEventPlugin();

const Header2 = (props) => {
  console.log(props);
  return (
    <div className="container">
      <h2 style={{margin:0}}>{props.h2title}</h2>
    </div>
    );
  };

export default Header2;
