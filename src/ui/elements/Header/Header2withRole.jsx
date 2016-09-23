// React Imports
import React from 'react';


const Header2withRole = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12"><h2>
        {props.h2title}, {props.h2Role}</h2>
      </div>
    </div>
  </div>
);

export default Header2withRole;
