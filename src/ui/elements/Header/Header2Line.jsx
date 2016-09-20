import React from 'react';


const Header2Line = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-6"><h2>
        {props.myTitle}</h2>
    </div><hr className="blue" />
    </div>
  </div>
);

export default Header2Line;
