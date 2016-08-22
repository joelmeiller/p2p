/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProgressMichelle from './progressbar.jsx';


storiesOf('elements/ProgressMichelle', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <ProgressMichelle
    valueProgress={80}
    />
  </div>
))
;
