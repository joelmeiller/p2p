
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import H3Input from './H3Input.jsx';
import MemberCard from './MemberCard.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/MemberCard', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::MemberCard', () => (
  <div className="app flex-center-middle">
    <MemberCard
      title="Teammember 1"
      text="Dieses Mitglied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
      stars={3}
    />
  </div>
))
;
