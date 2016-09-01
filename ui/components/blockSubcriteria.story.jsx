
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BlockSubcriteria from './blockSubcriteria.jsx';

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
      criteriaText="Weicht Konflikten aus"
      criteriaTotalCount={5}
      criteriaEffective={3}
      criteriaText2="Trägt Konflikte unparteiisch und kooperativ aus"
      criteriaTotalCount2={5}
      criteriaEffective2={3}
      />
  </div>
))
;
