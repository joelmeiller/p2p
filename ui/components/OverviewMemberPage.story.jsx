import React from 'react';
import { storiesOf } from '@kadira/storybook';
import OverviewMemberPage from './OverviewMemberPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::OverviewMemberPage', () => (
  <div className="app flex-center-middle">
    <OverviewMemberPage
      title="Dashboard"
      memberOrCriteria={[
        {
          label:"Nach Kriterien"
        }, {
          label:"Nach Teammitglieder"
        }
      ]}
      value="Nach Teammitglieder"
      memberName="Remo Sieber"
      memberRole="PL"
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
