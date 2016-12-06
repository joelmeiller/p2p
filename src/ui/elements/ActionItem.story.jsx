
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ActionItem from './ActionItem.jsx';


storiesOf('elements/ActionItem', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.addWithInfo('::Specification',
  `
    Card mit einer Aktion, die der Benutzer ausführen kann und in der Inbox angezeigt wird.
  `
  , () => (
  <ActionItem
    message="QM hat neue Kriterien hinzugefügt"
    actionText="Okay"
    type="info"
    date={new Date()}
    buttonText="Okay"
  />),
  { inline: true }
)
.add('::filled', () => (
  <div className="app flex-center-middle">
    <ActionItem
      message="QM hat neue Kriterien hinzugefügt"
      actionText="Okay"
      type="info"
      date={new Date()}
    />
  </div>
))
.add('::warning', () => (
  <div className="app flex-center-middle">
    <ActionItem
      message="Noch zwei Tage um die Bewertung abzugeben"
      actionText="Got it"
      status="warning"
      date={new Date()}
    />
  </div>
))
.add('::urgent', () => (
  <div className="app flex-center-middle">
    <ActionItem
      message="Deine Bewertung ist immer noch nicht ausgefüllt und die Deadline ist vorbei! Die Bewertung wurde automatisch übermittelt"
      actionText="Hmmm..."
      status="urgent"
    />
  </div>
))
;
