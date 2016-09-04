/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StarsRating2 from './starsV2.jsx';


storiesOf('elements/StarsRating', module)
.add('::V2', () => (
  <div className="app flex-center-middle">
    <StarsRating2
      valueEffective={3}
    />
  </div>
))
;
