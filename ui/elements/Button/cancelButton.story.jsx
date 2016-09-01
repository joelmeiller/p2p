/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CancelButton from './cancelButton.jsx';


storiesOf('elements/Button', module)
.add('::cancel', () => (
  <div className="app flex-center-middle">
    <CancelButton

    />
  </div>
))
;
