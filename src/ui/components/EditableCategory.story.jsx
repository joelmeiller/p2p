
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditableCategory from './EditableCategory.jsx';


storiesOf('components/EditableCategory', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <EditableCategory
      id="12345"
      title="Teamkompetenzen"
      criterias={[{
        id: '33333',
        label: 'Weicht konflikten aus',
      }, {
        id: '33334',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
      }]}
      selectCriterias={[{
        id: '33335',
        label: 'Ist teamfähig',
      }, {
        id: '33336',
        label: 'Kommuniziert aktiv',
      }]}
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <EditableCategory
      id="12345"
      title="Teamkompetenzen"
      criterias={[{
        id: '33333',
        label: 'Weicht konflikten aus',
        readonly: true,
      }, {
        id: '33334',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        readonly: true,
      }]}
      selectCriterias={[{
        id: '33335',
        label: 'Ist teamfähig',
      }, {
        id: '33336',
        label: 'Kommuniziert aktiv',
      }]}
      readonly
    />
  </div>
))
.add('::self', () => (
  <div className="app flex-center-middle">
    <EditableCategory
      id="12345"
      title="Teamkompetenzen"
      criterias={[{
        id: '33333',
        label: 'Weicht konflikten aus',
        self: true,
      }, {
        id: '33334',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        self: true,
      }]}
      selectCriterias={[{
        id: '33335',
        label: 'Ist teamfähig',
      }, {
        id: '33336',
        label: 'Kommuniziert aktiv',
      }]}
    />
  </div>
))
.add('::self & readonly', () => (
  <div className="app flex-center-middle">
    <EditableCategory
      id="12345"
      title="Teamkompetenzen"
      criterias={[{
        id: '33333',
        label: 'Weicht konflikten aus',
        self: true,
        readonly: true,
      }, {
        id: '33334',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        self: true,
        readonly: true,
      }]}
      selectCriterias={[{
        id: '33335',
        label: 'Ist teamfähig',
      }, {
        id: '33336',
        label: 'Kommuniziert aktiv',
      }]}
      readonly
    />
  </div>
))
;
