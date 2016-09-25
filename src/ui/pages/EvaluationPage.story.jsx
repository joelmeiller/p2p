import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EvaluationPage from './EvaluationPage.jsx';

storiesOf('components/Pages', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::EvaluationPage', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      id="1234"
      name="Martin Steiner"
      role="QM"
      progress={20}
      categories={[{
        id: '12345',
        title: 'Konflikt Kompetenzen',
        criterias: [{
          id: '33333',
          label: 'Weicht konflikten aus',
          stars: 3,
        }, {
          id: '33334',
          label: 'Trägt Konflikte unparteiisch und kooperativ aus',
          stars: 3,
        }],
      }, {
        id: '12355',
        title: 'Team Kompetenzen',
        criterias: [{
          id: '33335',
          label: 'Bringt sich selber ins Team ein',
          stars: 1,
        }],
      }, {
        id: '12356',
        title: 'Eigene Kriterien',
        criterias: [{
          id: '33336',
          label: 'Ist neugierig & Interessiert',
          stars: 1,
        }],
      }]}
      comment=""
    />
  </div>
))
;
