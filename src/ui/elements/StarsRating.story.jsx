import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StarsRating from './StarsRating.jsx';


storiesOf('elements/StarsRating', module)
.addWithInfo(
  'Specs',
  '',
  () => (
    <StarsRating
      value={1}
      name="Text"
    />
  ),
  { inline: true }
)
.add('::selected', () => (
  <div className="app flex-center-middle">
    <StarsRating
      value={3}
      name="Teamfähigkeit"
    />
  </div>
))
.add('::readonly', () => (
  <div className="app flex-center-middle">
    <StarsRating
      value={4}
      name="Teamfähigkeit"
      readonly
    />
  </div>
))
;
