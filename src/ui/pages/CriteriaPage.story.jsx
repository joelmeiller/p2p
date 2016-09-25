import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CriteriaPage from './CriteriaPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Page', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::CriteriaPage', () => (
  <div className="app flex-center-middle">
    <CriteriaPage
      title="Dashboard"
      members={[
        {
          label:"Nach Kriterien"
        }, {
          label:"Nach Teammitglieder"
        }
      ]}
      criterias={[
        {
          title: "Hält Zusagen ein",
          ratings:[
            {
              name: "Michelle Steiner",
              role: "QM",
              stars: 3
            }, {
              name: "Rebekka Burri",
              role: "TEC",
              stars: 2
            }, {
              name: "Martin Steiner",
              role: "QM",
              stars: 5
            }, {
              name: "Bettina Rust",
              role: "REQ",
              stars: 1
            }
          ]
        },
        {
          title: "ist motiviert",
          ratings:[
            {
              name: "Michelle Steiner",
              role: "QM",
              stars: 5
            }, {
              name: "Rebekka Burri",
              role: "TEC",
              stars: 5
            }, {
              name: "Martin Steiner",
              role: "QM",
              stars: 1
            }, {
              name: "Bettina Rust",
              role: "REQ",
              stars: 5
            }
          ]
        }
      ]}
      />
  </div>
))
;
