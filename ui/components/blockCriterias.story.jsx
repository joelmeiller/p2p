
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BlockCriterias from './blockCriterias.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Block', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::CriteriasStars', () => (
  <div className="app flex-center-middle">
    <BlockCriterias
      criteriaTitle1="Konflikt Kompetenzen"
      criteriaText11="Weicht Konflikten aus"
      criteriaTotalCount11={5}
      criteriaEffective11={3}
      criteriaText12="Trägt Konflikte unparteiisch und kooperativ aus"
      criteriaTotalCount12={5}
      criteriaEffective12={3}

      criteriaTitle2="Team Kompetenzen"
      criteriaText22="Bringt sich selbst im Team ein"
      criteriaTotalCount21={5}
      criteriaEffective21={3}
      />
  </div>
))
;
