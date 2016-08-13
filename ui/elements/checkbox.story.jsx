/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import CheckboxMichelle from './inputfield.jsx';


storiesOf('elements/Checkbox', module)
.add('::unchecked', () => (
  <div className="app flex-center-middle">
    <CheckboxMichelle
      checkboxLabel="Im not checked"
    />
  </div>
))

;
