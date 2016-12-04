import React from 'react';

import Header2Line from '../elements/Header/Header2Line.jsx';

const GoodBye = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
      {/* TODO: i18n */}
        <Header2Line
          title="You have been logged out"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-xs-4" />
      <div className="col-xs-4">
      {/* TODO: i18n */}
        {props.loggedIn ?
          <p>Please wait while you are being logged out...</p> :
          <p>You can reload the page to get back to the login prompt.</p>
          }
      </div>
    </div>
  </div>
);

GoodBye.propTypes = {
  loggedIn: React.PropTypes.bool,
};

export default GoodBye;
