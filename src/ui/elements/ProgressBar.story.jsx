/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ProgressBar from './ProgressBar.jsx';

storiesOf('elements/ProgressBar', module)
.add('::filled', () => (
  <div className="app flex-center-middle">
    <ProgressBar
      value={80}
    />
  </div>
))
.add('::empty', () => (
  <div className="app flex-center-middle">
    <ProgressBar
      value={0}
    />
  </div>
));
