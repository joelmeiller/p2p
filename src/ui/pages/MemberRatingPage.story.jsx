import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MemberRatingPage from './MemberRatingPage.jsx';


storiesOf('pages/MemberRatingPage', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::open', () => (
  <div className="app flex-center-middle">
    <MemberRatingPage
      rating={3}
      members={[
        {
          id: '1234',
          name: 'Michelle Steiner',
          role: 'RE',
          rating: 3,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1235',
          name: 'Rebekka Burri',
          role: 'SA',
          rating: 5,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1236',
          name: 'Martin Muster',
          role: 'PL',
          rating: 2,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1237',
          name: 'Bettina Rust',
          role: 'RE',
          rating: 4,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        },
      ]}
    />
  </div>
))
.add('::anonymous', () => (
  <div className="app flex-center-middle">
    <MemberRatingPage
      rating={3}
      members={[
        {
          id: '1234',
          name: 'Rating 1',
          rating: 3,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1235',
          name: 'Rating 2',
          rating: 5,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1236',
          name: 'Rating 3',
          rating: 2,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1237',
          name: 'Rating 4',
          rating: 4,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        },
      ]}
    />
  </div>
))
.add('::warning', () => (
  <div className="app flex-center-middle">
    <MemberRatingPage
      rating={3}
      members={[
        {
          id: '1234',
          name: 'Michelle Steiner',
          role: 'RE',
          rating: 3,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1235',
          name: 'Rebekka Burri',
          role: 'SA',
          rating: 5,
          statusWarning: true,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1236',
          name: 'Martin Muster',
          role: 'PL',
          rating: 2,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        }, {
          id: '1237',
          name: 'Bettina Rust',
          role: 'RE',
          rating: 4,
          comment: 'Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde...'
        },
      ]}
    />
  </div>
))
;
