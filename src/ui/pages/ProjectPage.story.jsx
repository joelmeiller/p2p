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
          id: '1',
          title: 'Technology Chooser',
          coach: 'Markus Oehninger',
          qmName: 'joel.meiller@student.fhnw.ch',
          level: 'IP3',
          zeitmodell: 'BB',
          start: new Date('2016-05-05'),
          stop: null,
        }, {
          id: '2',
          title: 'Switch Server Anbindung',
          coach: 'Stefan Vetter',
          qmName: 'joel.meiller@student.fhnw.ch',
          level: 'IP3',
          zeitmodell: 'VZ_TZ',
          start: new Date('2014-03-05'),
          stop: new Date('2014-12-12'),
        }, {
          id: '3',
          title: 'Evento API Erweiterung',
          coach: 'Christoph Denzler',
          qmName: 'joel.meiller@student.fhnw.ch',
          level: 'IP3',
          zeitmodell: 'VZ_TZ',
          start: new Date('2016-05-05'),
          stop: null,
        }, {
          id: '4',
          title: 'Wasserspar App',
          coach: 'Markus Oehninger',
          qmName: 'joel.meiller@student.fhnw.ch',
          level: 'IP3',
          zeitmodell: 'BB',
          start: new Date('2016-05-05'),
          stop: new Date('2016-11-10'),
        },
      ]}
    />
  </div>
))
;
