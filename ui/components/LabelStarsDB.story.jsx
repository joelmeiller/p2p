import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LabelStarsDB from './LabelStarsDB.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Label', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::LabelStarsDB', () => (
  <div className="app flex-center-middle">
    <LabelStarsDB
      text="Michelle Andrey, QM"
      name="LabelStarsDB"
      stars={3}
      deviation={"deviation: "+2}
      grade={"grade: "+ 5.1}
      status="approved"
      />
  </div>
))
;
