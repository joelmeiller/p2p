
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BlockCriteria from './blockCriteria.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Block', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::criteriaStars', () => (
  <div className="app flex-center-middle">
    <BlockCriteria
      criteriaTitle="Team Kompetenzen"
      criteriaText="Bringt sich selbst im Team ein"
      criteriaTotalCount={5}
      criteriaEffective={3}
      />
  </div>
))
;
