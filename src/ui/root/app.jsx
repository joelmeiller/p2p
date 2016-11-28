import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReduxToastr from 'react-redux-toastr';

// Actions
import { updateAuthStatus, setImpersonation, doImpersonation } from '../../actions/app.js';

// Components
import AppBarHeader from '../components/AppBarHeader.jsx';
import DevLogin from '../components/DevLogin.jsx';
import GoodBye from '../components/GoodBye.jsx';

class App extends Component {
  componentDidMount() {
    this.props.updateAuthStatus();
  }

  render() {
    return (<div className="app">
      <AppBarHeader
        {...this.props}
      />
      <ReduxToastr
        position="top-center"
        progressBar
        preventDuplicates
      />
      <main>
        {this.props.loggedIn && this.props.children}
        {!this.props.loggedIn && this.props.activeProfile === 'dev' &&
          <DevLogin
            impersonatedEmail={this.props.impersonatedEmail}
            handleImpersonatedEmailChanged={this.props.handleImpersonatedEmailChanged}
            handleImpersonate={this.props.handleImpersonate}
          />}
        {!this.props.loggedIn && this.props.activeProfile === 'prod' && <GoodBye loggedIn={this.props.loggedIn} />}
        }
      </main>
    </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  updateAuthStatus: React.PropTypes.func,
  handleImpersonatedEmailChanged: React.PropTypes.func,
  handleImpersonate: React.PropTypes.func,
  loggedIn: React.PropTypes.bool,
  activeProfile: React.PropTypes.string,
  impersonatedEmail: React.PropTypes.string,
};


const mapStateToProps = (globalState, props) => {
  const { project, user, loggedIn, activeProfile, impersonatedEmail } = globalState.app;

  let username = '-';
  if (user) {
    username = user.role ? `${user.fullName}, ${user.role}` : user.fullName;
  }

  return {
    ...props,
    project: project || { title: 'Projekte' },
    user,
    username,
    loggedIn,
    activeProfile,
    impersonatedEmail,
  };
};

const mapDispatchToProps = dispatch => ({
  updateAuthStatus: () => dispatch(updateAuthStatus()),
  handleImpersonatedEmailChanged: email => dispatch(setImpersonation(email)),
  handleImpersonate: () => dispatch(doImpersonation()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
