import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditProjectPage from './EditProjectPage.jsx';


storiesOf('pages/EditProjectPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::example', () => (
  <div className="app flex-center-middle">
    <EditProjectPage
      entries={[
        {
          projects:"IP6: Project A",
          lastUpdate: "12.05.2016",
          status: "open",
          teamCoach: "Stefan Vetter"
        }, {
          projects:"Project B",
          lastUpdate: "31.08.2016",
          status: "open",
          teamCoach: "Christoph Denzler"
        }, {
          projects:"Project C",
          lastUpdate: "01.09.2016",
          status: "open",
          teamCoach: "Stefan Vetter"
        }, {
          projects:"Project D",
          lastUpdate: "01.01.2015",
          status: "closed",
          teamCoach: "Markus Oehninger"
        }
      ]}
      />
  </div>
))
;
