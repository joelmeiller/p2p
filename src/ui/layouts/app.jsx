import React from 'react';
import { connect } from 'react-redux';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Assessment from 'material-ui/svg-icons/action/assessment';

import { blue500 } from 'material-ui/styles/colors';


import AppBarHeader from '../components/AppBarHeader.jsx';


const SET_TITLE = 'app/SET_TITLE';

const initialState = {
  title: 'Dashboard',
};

export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

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
          icon: <Dashboard color={blue500} />,
          path: '/',
        }, {
          name: 'My Ratings',
          icon: <Assessment color={blue500} />,
          path: '/myrating',
        }, {
          name: 'My Account',
          icon: <AccountBox color={blue500} />,
          path: '/settings',
        }, {
          name: 'Logout',
          icon: <ExitToApp color={blue500} />,
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
