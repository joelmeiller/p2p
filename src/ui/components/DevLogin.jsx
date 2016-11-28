import React from 'react';

import { RaisedButton } from 'material-ui';
import TextField from 'material-ui/TextField';
import Header2Line from '../elements/Header/Header2Line.jsx';

const DevLogin = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title="Impersonate user (dev)"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2">
        <p>Email</p>
      </div>
      <div className="col-xs-8">
        <TextField
          hintText="email of user to impersonate"
          name="impersonatedEmail"
          fullWidth
          value={props.impersonatedEmail}
          onChange={e => props.handleImpersonatedEmailChanged(e.target.value)}
        />
      </div>
    </div>

    <div className="row push-top-medium">
      <div className="col-xs-4 align-right">
        <RaisedButton
          label="Impersonate!"
          onClick={props.handleImpersonate}
        />
      </div>
    </div>
  </div>
);

DevLogin.propTypes = {
  impersonatedEmail: React.PropTypes.string,
  handleImpersonatedEmailChanged: React.PropTypes.func,
  handleImpersonate: React.PropTypes.func,
};

export default DevLogin;
