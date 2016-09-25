import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MemberRatingPage from './MemberRatingPage.jsx';


storiesOf('components/Pages', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::MemberRatingPage', () => (
  <div className="app flex-center-middle">
    <MemberRatingPage
      rating={3}
      members={[
        {
          id: '1234',
          name: 'Teammember 1',
          rating: 3,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1235',
          name: 'Teammember 2',
          rating: 5,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1236',
          name: 'Teammember 3',
          rating: 2,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1237',
          name: 'Teammember 4',
          rating: 4,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        },
      ]}
    />
  </div>
))
;
