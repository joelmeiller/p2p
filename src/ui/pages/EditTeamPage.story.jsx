import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditTeamPage from './EditTeamPage.jsx';

import { reducer as autosuggest } from '../elements/AutoSuggest.jsx';

const store = createStore(
  combineReducers({ autosuggest })
);

storiesOf('pages/EditTeamPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <Provider store={store}>
      <EditTeamPage
        members={[{
          id: '1234',
          name: 'Michelle Steiner',
          email: 'michelle.steiner@students.fhnw.ch',
          self: true,
          roles: [{
            id: 'QM',
            title: 'Quality Manager',
            active: true,
          }],
        }, {
          id: '1235',
          name: 'Rebekka Burri',
          email: 'rebekka.burri@students.fhnw.ch',
          roles: [{
            id: 'SA',
            title: 'Software Architekt',
            active: true,
          }],
        }, {
          id: '1236',
          name: 'Martin Muster',
          email: 'martin.muster@students.fhnw.ch',
          roles: [{
            id: 'PL',
            title: 'Projektleiter',
            active: true,
          }],
        }, {
          id: '1237',
          name: 'Bettina Rust',
          email: 'bettina.rust@students.fhnw.ch',
          roles: [{
            id: 'RE',
            title: 'Requirements Engineer',
            active: true,
          }],
        }]}
        roles={[{
          id: 'IM',
          title: 'Information Manager',
        }, {
          id: 'QM',
          title: 'Quality Manager',
        }, {
          id: 'RE',
          title: 'Requirements Engineer',
        }, {
          id: 'SA',
          title: 'Software Architekt',
        }, {
          id: 'PL',
          title: 'Projektleiter',
        }]}
      />
    </Provider>
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <Provider store={store}>
      <EditTeamPage
        members={[{
          id: '1234',
          name: 'Michelle Steiner',
          email: 'michelle.steiner@students.fhnw.ch',
          self: true,
          roles: [{
            id: 'QM',
            title: 'Quality Manager',
            active: true,
          }],
        }]}
        roles={[{
          id: 'IM',
          title: 'Information Manager',
        }, {
          id: 'QM',
          title: 'Quality Manager',
        }, {
          id: 'RE',
          title: 'Requirements Engineer',
        }, {
          id: 'SA',
          title: 'Software Architekt',
        }, {
          id: 'PL',
          title: 'Projektleiter',
        }]}
      />
    </Provider>
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <Provider store={store}>
      <EditTeamPage
        readonly
        members={[{
          id: '1234',
          name: 'Michelle Steiner',
          email: 'michelle.steiner@students.fhnw.ch',
          self: true,
          roles: [{
            id: 'QM',
            title: 'Quality Manager',
            active: true,
          }],
        }, {
          id: '1235',
          name: 'Rebekka Burri',
          email: 'rebekka.burri@students.fhnw.ch',
          roles: [{
            id: 'SA',
            title: 'Software Architekt',
            active: true,
          }],
        }, {
          id: '1236',
          name: 'Martin Muster',
          email: 'martin.muster@students.fhnw.ch',
          roles: [{
            id: 'PL',
            title: 'Projektleiter',
            active: true,
          }],
        }, {
          id: '1237',
          name: 'Bettina Rust',
          email: 'bettina.rust@students.fhnw.ch',
          roles: [{
            id: 'RE',
            title: 'Requirements Engineer',
            active: true,
          }],
        }]}
        roles={[{
          id: 'IM',
          title: 'Information Manager',
        }, {
          id: 'QM',
          title: 'Quality Manager',
        }, {
          id: 'RE',
          title: 'Requirements Engineer',
        }, {
          id: 'SA',
          title: 'Software Architekt',
        }, {
          id: 'PL',
          title: 'Projektleiter',
        }]}
      />
    </Provider>
  </div>
))
;
