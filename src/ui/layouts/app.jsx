import React from 'react';
import { connect } from 'react-redux';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Assessment from 'material-ui/svg-icons/action/assessment';

// Actions
import { SET_TITLE } from '../../actions/app.js';

// Components
import AppBarHeader from '../components/AppBarHeader.jsx';


const initialState = {
  title: 'Dashboard',
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
};

const App = props => (
  <div className="app">
    <AppBarHeader
      title={props.title}
      menuItems={[
        {
          name: 'Dashboard',
          icon: <Dashboard className="menu-icon" />,
          path: '/',
        }, {
          name: 'My Ratings',
          icon: <Assessment className="menu-icon" />,
          path: '/myrating',
        }, {
          name: 'My Account',
          icon: <AccountBox className="menu-icon" />,
          path: '/settings',
        }, {
          name: 'Logout',
          icon: <ExitToApp className="menu-icon" />,
        },
      ]}
    />
    <main>
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
};

const mapStateToProps = (globalState, props) => {
  const { title } = globalState.app;

  return {
    title,
    ...props,
  };
};

export default connect(mapStateToProps)(App);
