import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReduxToastr from 'react-redux-toastr';

// Actions
import { fetchUserAndProjectSettings } from '../../actions/app.js';

// Components
import AppBarHeader from '../components/AppBarHeader.jsx';

class App extends Component {
  componentDidMount() {
    this.props.fetchUserAndProject();
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
        {this.props.children}
      </main>
    </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  fetchUserAndProject: React.PropTypes.func,
};


const mapStateToProps = (globalState, props) => {
  const { project, user } = globalState.app;

  const username = user.role ? `${user.fullName}, ${user.role}` : user.fullName;

  return {
    ...project,
    ...props,
    ...user,
    username,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUserAndProject: () => dispatch(fetchUserAndProjectSettings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
