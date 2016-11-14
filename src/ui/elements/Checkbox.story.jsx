/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from './Checkbox.jsx';


storiesOf('elements/Checkbox', module)
.add('::checkbox', () => (
  <div className="app flex-center-middle">
    <Checkbox
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
