import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StarsRating from './StarsRating.jsx';


storiesOf('elements/StarsRating', module)
.add('::three selected', () => (
  <div className="app flex-center-middle">
    <StarsRating
      valueEffective={3}
    />
  </div>
))
;
