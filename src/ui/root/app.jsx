import React, { Component } from 'react';
import { connect } from 'react-redux';


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

  let username = ''
  if (user) {
    user.role ? `${user.fullName}, ${user.role}` : user.fullName;
  }

  return {
    ...props,
    ...project,
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
