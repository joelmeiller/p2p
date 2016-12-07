import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EvaluationPage from './EvaluationPage.jsx';

// TODO: Add redux store to page

storiesOf('pages/EvaluationPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.addWithInfo('Specification', 'Shows the evaluation of a single member', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      id="1234"
      name="Martin Steiner"
      role="QM"
      progress={80}
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
          rating: 3,
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
          rating: 1,
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          rating: 1,
        }],
      }]}
      comment=""
    />
  </div>),
  { inline: true }
)
.add('::filled', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      id="1234"
      name="Martin Steiner"
      role="QM"
      progress={80}
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
          rating: 3,
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
          rating: 1,
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          rating: 1,
        }],
      }]}
      comment=""
    />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      id="1234"
      name="Martin Steiner"
      role="QM"
      progress={0}
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
        }],
      }]}
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      id="1234"
      name="Martin Steiner"
      role="TM"
      rating={2.5}
      readonly
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
          rating: 3,
        }, {
          id: '33334',
          label: 'Trägt Konflikte unparteiisch und kooperativ aus',
          rating: 3,
        }],
      }, {
        id: '12355',
        title: 'Team Kompetenzen',
        criterias: [{
          id: '33335',
          label: 'Bringt sich selber ins Team ein',
          rating: 1,
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          rating: 1,
        }],
      }]}
      comment="Hat viel zum Projekt beigetragen"
    />
  </div>
))
;
