// React Imports
import React from 'react';


const Header3Line = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6"><h3>
        {props.title}</h3>
      </div><hr className="blue" />
    </div>
  </div>
);


export default Header3Line;
