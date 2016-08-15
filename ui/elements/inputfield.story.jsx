/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import InputMichelle from './inputfield.jsx';


storiesOf('elements/InputMichelle', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <InputMichelle
      hintText="Gib etwas ein, Bitch!"
      michelle="42 Supergeil"
    />
  </div>
))
;
