
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditableMember from './EditableMember.jsx';


storiesOf('components/EditableMember', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <EditableMember
      id="1234"
      name="Michelle Steiner"
      email="michelle.steiner@students.fhnw.ch"
      roles={[{
        id: 'QM',
        title: 'Quality Manager',
        active: true,
      }]}
      selectRoles={[{
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
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <EditableMember
      id="1234"
      name="Michelle Steiner"
      email="michelle.steiner@students.fhnw.ch"
      readonly
      roles={[{
        id: 'SA',
        title: 'Software Architekt',
        active: true,
      }]}
    />
  </div>
))
.add('::self', () => (
  <div className="app flex-center-middle">
    <EditableMember
      id="1234"
      self
      name="Michelle Steiner"
      email="michelle.steiner@students.fhnw.ch"
      roles={[{
        id: 'QM',
        title: 'Quality Manager',
        active: true,
      }]}
    />
  </div>
))
.add('::multi-roles', () => (
  <div className="app flex-center-middle">
    <EditableMember
      id="1234"
      name="Michelle Steiner"
      email="michelle.steiner@students.fhnw.ch"
      readonly
      roles={[{
        id: 'SA',
        title: 'Software Architekt',
        active: true,
      }, {
        id: 'RE',
        title: 'Requirements Engineer',
      }]}
    />
  </div>
))
;
