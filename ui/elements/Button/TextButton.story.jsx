/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TextButton from './TextButton.jsx';

storiesOf('elements/Button', module)
.add('::text', () => (
  <div className="app flex-center-middle">
    <TextButton text="text" />
  </div>
))
;
