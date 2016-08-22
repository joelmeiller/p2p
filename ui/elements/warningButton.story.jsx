/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import WarningButton from './warningButton.jsx';

storiesOf('elements/warningButton', module)
.add('::normal', () => (
  <div className="app flex-center-middle">
    <WarningButton
      name="Im a button"
    />
  </div>
))
;
