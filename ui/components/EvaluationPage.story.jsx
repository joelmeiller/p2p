import React from 'react';
import { storiesOf } from '@kadira/storybook';
import EvaluationPage from './EvaluationPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::EvaluationPage', () => (
  <div className="app flex-center-middle">
    <EvaluationPage
      title="Evaluation"
      members={[
        {
          label:"Michelle"
        }, {
          label:"Rebekka"
        }, {
          label:"Martin"
        }, {
          label:"Bettina"
        }, {
          label:"Andreas"
        }, {
          label:"Joel"
        }, {
          label:"Remo"
        }, {
          label:"Thierry"
        }
      ]}
      initialSelectedIndex={2}
      memberName="Martin Steiner"
      memberRole="QM"
      pageProgress={20}
      criteriaBlocks={[{
          title: "Konflikt Kompetenzen",
          criterias: [{
            label: "Weicht konflikten aus",
            stars: 3
          }, {
            label: "Trägt Konflikte unparteiisch und kooperativ aus",
            stars: 3
          }]
        }, {
          title: "Team Kompetenzen",
          criterias: [{
            label: "Bringt sich selber ins Team ein",
            stars: 1
          }]
        }, {
          title: "Eigene Kriterien",
          criterias: [{
            label: "Ist neugierig & Interessiert",
            stars: 1
          }]
        }]}
        evalComment=""
      />
  </div>
))
;
