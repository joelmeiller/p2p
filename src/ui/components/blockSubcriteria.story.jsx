
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BlockSubcriteria from './BlockSubcriteria.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Block', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::SubcriteriaStars', () => (
  <div className="app flex-center-middle">
    <BlockSubcriteria
      criteriaTitle="Konflikt Kompetenzen"
      criterias={[
        {
          label: "Weicht Konflikten aus",
          stars: 3
        }, {
          label: "Trägt Konflikte unparteiisch und kooperativ aus",
          stars: 3
        }
      ]}
    />
  </div>
))
;
