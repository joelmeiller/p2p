
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Category from './Category.jsx';


storiesOf('components/Category', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <Category
      id="12345"
      title="Teamkompetenzen"
      criterias={[{
        id: '33333',
        label: 'Weicht konflikten aus',
      }, {
        id: '33334',
        label: 'Trägt Konflikte unparteiisch und kooperativ aus',
      }]}
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <Category
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
    />
  </div>
))
.add('::self', () => (
  <div className="app flex-center-middle">
    <Category
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
    />
  </div>
))
.add('::self & readonly', () => (
  <div className="app flex-center-middle">
    <Category
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
    />
  </div>
))
;
