import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CriteriaPage from './CriteriaPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::CriteriaPage', () => (
  <div className="app flex-center-middle">
    <CriteriaPage
      title="Criterias"
      criteriaBlocks={[
        {
          label:"Basale"
        }, {
          label:"Personal-Soziale"
        }, {
          label:"Kommunikative"
        }, {
          label:"Konflikt"
        }, {
          label:"Team"
        }
      ]}
      value="Kommunikative"
      myTitle="Kommunikative Kompetenzen"
      criterias={[
        {
          text:"Kann eigene und fremde Anliegn höflich artikulieren"
        }, {
          text:"Passt ausdrucksweise an Stakeholder an"
        }, {
          text:"Kommuniziert in Wort und Schrift verständlich"
        }
      ]}
      />
  </div>
))
;
