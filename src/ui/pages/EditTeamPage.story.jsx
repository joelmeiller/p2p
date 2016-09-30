import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditTeamPage from './EditTeamPage.jsx';


storiesOf('pages/EditTeamPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <EditTeamPage
      members={[{
        id: '1234',
        name: 'Michelle Steiner',
        email: 'michelle.steiner@students.fhnw.ch',
        self: true,
        roles: [{
          type: 'QM',
          title: 'Quality Manager',
          active: true,
        }],
      }, {
        id: '1235',
        name: 'Rebekka Burri',
        email: 'rebekka.burri@students.fhnw.ch',
        roles: [{
          type: 'SA',
          title: 'Software Architekt',
          active: true,
        }],
      }, {
        id: '1236',
        name: 'Martin Muster',
        email: 'martin.muster@students.fhnw.ch',
        roles: [{
          type: 'PL',
          title: 'Projektleiter',
          active: true,
        }],
      }, {
        id: '1237',
        name: 'Bettina Rust',
        email: 'bettina.rust@students.fhnw.ch',
        roles: [{
          type: 'RE',
          title: 'Requirements Engineer',
          active: true,
        }],
      }]}
      roles={[{
        type: 'IM',
        title: 'Information Manager',
      }, {
        type: 'QM',
        title: 'Quality Manager',
      }, {
        type: 'RE',
        title: 'Requirements Engineer',
      }, {
        type: 'SA',
        title: 'Software Architekt',
      }, {
        type: 'PL',
        title: 'Projektleiter',
      }]}
    />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <EditTeamPage
      members={[{
        id: '1234',
        name: 'Michelle Steiner',
        email: 'michelle.steiner@students.fhnw.ch',
        self: true,
        roles: [{
          type: 'QM',
          title: 'Quality Manager',
          active: true,
        }],
      }]}
      roles={[{
        type: 'IM',
        title: 'Information Manager',
      }, {
        type: 'QM',
        title: 'Quality Manager',
      }, {
        type: 'RE',
        title: 'Requirements Engineer',
      }, {
        type: 'SA',
        title: 'Software Architekt',
      }, {
        type: 'PL',
        title: 'Projektleiter',
      }]}
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <EditTeamPage
      readonly
      members={[{
        id: '1234',
        name: 'Michelle Steiner',
        email: 'michelle.steiner@students.fhnw.ch',
        self: true,
        roles: [{
          type: 'QM',
          title: 'Quality Manager',
          active: true,
        }],
      }, {
        id: '1235',
        name: 'Rebekka Burri',
        email: 'rebekka.burri@students.fhnw.ch',
        roles: [{
          type: 'SA',
          title: 'Software Architekt',
          active: true,
        }],
      }, {
        id: '1236',
        name: 'Martin Muster',
        email: 'martin.muster@students.fhnw.ch',
        roles: [{
          type: 'PL',
          title: 'Projektleiter',
          active: true,
        }],
      }, {
        id: '1237',
        name: 'Bettina Rust',
        email: 'bettina.rust@students.fhnw.ch',
        roles: [{
          type: 'RE',
          title: 'Requirements Engineer',
          active: true,
        }],
      }]}
      roles={[{
        type: 'IM',
        title: 'Information Manager',
      }, {
        type: 'QM',
        title: 'Quality Manager',
      }, {
        type: 'RE',
        title: 'Requirements Engineer',
      }, {
        type: 'SA',
        title: 'Software Architekt',
      }, {
        type: 'PL',
        title: 'Projektleiter',
      }]}
    />
  </div>
))
;
