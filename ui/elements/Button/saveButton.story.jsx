/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SaveButton from './saveButton.jsx';


storiesOf('elements/Button', module)
.add('::save', () => (
  <div className="app flex-center-middle">
    <SaveButton
    />
  </div>
))
;
