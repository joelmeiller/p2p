import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LabeledStarRatingWithGrade from './LabeledStarRatingWithGrade.jsx';

storiesOf('components/LabeledStarRatingWithGrade', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <LabeledStarRatingWithGrade
      label="Michelle Andrey, QM"
      id="123456"
      value={3}
      deviation={+2}
      grade={5.1}
      status="approved"
    />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <LabeledStarRatingWithGrade
      label="Michelle Andrey, QM"
      id="123456"
      value={0}
      status="open"
    />
  </div>
))
;
