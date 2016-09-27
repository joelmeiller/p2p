import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CriteriaPage from './CriteriaPage.jsx';


storiesOf('pages/CriteriaPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <CriteriaPage
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
        }, {
          id: '33334',
          label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        }],
      }, {
        id: '12355',
        title: 'Team Kompetenzen',
        criterias: [{
          id: '33335',
          label: 'Bringt sich selber ins Team ein',
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          self: true,
        }],
      }]}
    />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <CriteriaPage
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
      }, {
        id: '12355',
        title: 'Team Kompetenzen',
        criterias: [{
          id: '33335',
          label: 'Bringt sich selber ins Team ein',
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
      }]}
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <CriteriaPage
      readonly
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
        }, {
          id: '33334',
          label: 'Trägt Konflikte unparteiisch und kooperativ aus',
        }],
      }, {
        id: '12355',
        title: 'Team Kompetenzen',
        criterias: [{
          id: '33335',
          label: 'Bringt sich selber ins Team ein',
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          self: true,
        }],
      }]}
    />
  </div>
))
;
