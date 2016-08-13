/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StarsRating2 from './starsV2.jsx';


storiesOf('elements/StarsRating2', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <StarsRating2
      startCountMichelle={5}
      valueEffective={3}
    />
  </div>
))
;
