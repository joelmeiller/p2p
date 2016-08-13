/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StarsRating from './starsV1.jsx';


storiesOf('elements/StarsRating', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <StarsRating
      totalRating={5}
      actualRating={2}
    />
  </div>
))
;
