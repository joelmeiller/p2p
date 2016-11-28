import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { doLogout } from '../actions/app.js';

class LogoutComponent extends Component {
  componentWillMount() {
    const push = this.props.router.push;
    this.props.dispatch(doLogout()).then(() => push('/ip-p2p'));
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = (globalState, props) => props;

LogoutComponent.propTypes = {
  dispatch: React.PropTypes.func,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(LogoutComponent));
