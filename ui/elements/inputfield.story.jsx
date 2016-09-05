import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Inputfield from './Inputfield.jsx';

storiesOf('elements', module)
.add('::Inputfield', () => (
  <div className="app flex-center-middle">
    <Inputfield
      hintText="Gib etwas ein!"
      defaultValue="42 Supergeil"
      />
  </div>
))
;
