/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DropdownMichelle from './dropdown.jsx';


storiesOf('elements/DropdownMichelle', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <DropdownMichelle
    val1="erster Eintrag"
    val2="zweiter Eintrag"
    val3="dritter Eintrag"
    val4="vierter Eintrag"
    val5="fünfter Eintrag"
    />
  </div>
))

;
