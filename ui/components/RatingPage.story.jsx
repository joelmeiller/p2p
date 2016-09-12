import React from 'react';
import { storiesOf } from '@kadira/storybook';
import RatingPage from './RatingPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::RatingPage', () => (
  <div className="app flex-center-middle">
    <RatingPage
      title="My Rating"
      finalRating={3}
      ratings={[
        {
          title: "Teammember 1",
          stars: 3,
          text: "Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
        }, {
          title: "Teammember 2",
          stars: 5,
          text: "Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
        }, {
          title: "Teammember 3",
          stars: 2,
          text: "Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
        }, {
          title: "Teammember 4",
          stars: 4,
          text: "Dieses Mitlgied hat sich sehr engagiert und die Zusammenarbeit war sehr angenehm, es wurde..."
        }
      ]}
      />
  </div>
))
;
