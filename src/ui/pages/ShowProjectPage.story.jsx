import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ShowProjectPage from './ShowProjectPage.jsx';

// TODO: Add redux store to page

storiesOf('pages/ShowProjectPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::edit', () => (
  <div className="app flex-center-middle">
    <ShowProjectPage
      title="Fancy Project"
      coach="Freddy Krüger"
      qmName="joel.meiller@students.fhnw.ch"
      level="IP3"
      zeitmodell="BB"
      start={new Date('2016-01-01')}
      stop={null}
    />
  </div>
));
