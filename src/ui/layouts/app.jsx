import React, { Component } from 'react';
import { connect } from 'react-redux';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Grade from 'material-ui/svg-icons/action/grade';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';

// Actions
import { SET_TITLE, RECEIVE_USER, fetchUserAndProjectSettings } from '../../actions/app.js';

// Components
import AppBarHeader from '../components/AppBarHeader.jsx';


const initialState = {
  title: 'Dashboard',
  user: {},
  project: {},
  isFetching: false,
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case RECEIVE_USER:
      return {
        ...state,
        project: action.project,
        user: action.user,
      };
    default:
      return state;
  }
};

const userMenuTM = props => ([
  {
    name: 'Evaluation',
    icon: <Dashboard className="menu-icon" />,
    path: `/${props.testParam}`,
    disabled: props.isFinal,
  }, {
    name: 'My Ratings',
    icon: <Assessment className="menu-icon" />,
    path: '/myrating',
    disabled: !props.isFinal,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/settings',
  }, {
    name: 'Logout',
    icon: <ExitToApp className="menu-icon" />,
  },
]);

const userMenuQM = props => ([
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/',
  }, {
    name: 'Evaluation',
    icon: <Grade className="menu-icon" />,
    path: '/',
    disabled: !props.isFinal,
  }, {
    name: 'Teammembers',
    icon: <Accessibility className="menu-icon" />,
    path: '/team/edit',
  }, {
    name: 'Criteria',
    icon: <List className="menu-icon" />,
    path: '/criteria/edit',
  }, {
    name: 'Project Settings',
    icon: <Settings className="menu-icon" />,
    path: '/project/settings',
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/settings',
  }, {
    name: 'Logout',
    icon: <ExitToApp className="menu-icon" />,
  },
]);

class App extends Component {
  componentDidMount() {
    this.props.fetchUserAndProject();
  }

  render() {
    console.log(this.props);
    return (<div className="app">
      <AppBarHeader
        title={this.props.title}
        username={this.props.username}
        menuItems={this.props.isQM ? userMenuQM(this.props) : userMenuTM(this.props)}
      />
      <main>
        {this.props.children}
      </main>
    </div>);
  }
}

App.propTypes = {
  title: React.PropTypes.string,
  username: React.PropTypes.string,
  children: React.PropTypes.node,
  fetchUserAndProject: React.PropTypes.func,
  isQM: React.PropTypes.bool,
};


const mapStateToProps = (globalState, props) => {
  const { project, user } = globalState.app;

  const username = user.role ? `${user.fullName}, ${user.role}` : user.fullName;
  const isFinal = props.params.test === 'final';
  const isQM = props.params.test === 'isQM' || user.isQM;

  return {
    ...project,
    ...props,
    username,
    isQM,
    isFinal,
    testParam: props.params.test,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserAndProject: () => dispatch(fetchUserAndProjectSettings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
