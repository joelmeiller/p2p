import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ProjectPage from './ProjectPage.jsx';


storiesOf('pages/ProjectPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <ProjectPage
      projects={[
        {
          id: '12345',
          level: 'IP3',
          start: 'FS16',
          type: '',
          title: 'Technology Chooser',
          lastUpdate: '22.09.16 13.34',
          status: 'complete',
          coach: 'Markus Oehninger',
        }, {
          id: '12346',
          level: 'IP4',
          start: 'FS16',
          type: 'BB',
          title: 'Switch Server Anbindung',
          lastUpdate: '22.09.16 13.34',
          status: 'pending',
          coach: 'Stefan Vetter',
        }, {
          id: '12347',
          level: 'IP4',
          start: 'FS16',
          type: '',
          title: 'Evento API Erweiterung',
          lastUpdate: '22.09.16 13.34',
          status: 'pending',
          coach: 'Christoph Denzler',
        }, {
          id: '12348',
          level: 'IP3',
          start: 'FS16',
          type: '',
          title: 'Wasserspar App',
          lastUpdate: '22.09.16 13.34',
          status: 'overdue',
          statusWarning: true,
          coach: 'Markus Oehninger',
        },
      ]}
    />
  </div>
))
;
