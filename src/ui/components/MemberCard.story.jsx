
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MemberCard from './MemberCard.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/MemberCard', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::filled', () => (
  <div className="app flex-center-middle">
    <MemberCard
      name="Teammember 1"
      role="RE"
      comment="Dieses Mitglied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
      rating={3}
    />
  </div>
))
.add('::warning', () => (
  <div className="app flex-center-middle">
    <MemberCard
      name="Teammember 1"
      role="RE"
    />
  </div>
))
;
