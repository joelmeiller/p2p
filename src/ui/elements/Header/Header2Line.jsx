import React from 'react';


const Header2Line = props => (
  <div className="container header2">
    <div className="row">
      <div className="col-xs-6">
        <h2>{props.title}</h2>
      </div>
      <hr />
    </div>
  </div>
);

Header2Line.propTypes = {
  title: React.PropTypes.string,
};

export default Header2Line;
