import React from 'react';
import { connect } from 'react-redux';

import AppBarHeader from '../components/AppBarHeader.jsx';


const SET_TITLE = 'app/SET_TITLE';

const initialState = {
  title: 'Dashboard',
};

export const setTitle = (title) => ({
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
}

const App = (props) => (
  <div className="app">
    <AppBarHeader title={props.title} />
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
