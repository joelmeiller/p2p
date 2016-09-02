/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabHeader from './tab.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

storiesOf('components/Tab', module)
.addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    {story()}
  </MuiThemeProvider>
))
.add('::header', () => (
  <div className="app flex-center-middle">
    <TabHeader
      tab1="Michelle"
      tab2="Rebekka"
      tab3="Martin"
      tab4="Bettina"
      tab5="Andreas"
      tab6="Joel"
      tab7="Remo"
      tab8="Thierry"
      />
  </div>
))
;
