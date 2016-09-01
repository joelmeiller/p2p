
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CriteriaStars from './criteriaStars.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::CriteriaStars', () => (
  <div className="app flex-center-middle">
    <CriteriaStars
      textCriteria="Weicht Konflikten aus"
      starsTotalCount={5}
      valueEffective={3}
      />
  </div>
))
;
