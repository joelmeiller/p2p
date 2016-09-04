/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ProgressBar from './ProgressBar.jsx';

storiesOf('elements', module)
.add('::ProgressBar', () => (
  <div className="app flex-center-middle">
    <ProgressBar
      value={80}
      />
  </div>
));
  
