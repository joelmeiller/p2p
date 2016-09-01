/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AddButton from './addButton.jsx';


storiesOf('elements/Button', module)
.add('::add', () => (
  <div className="app flex-center-middle">
    <AddButton

    />
  </div>
))
;
