/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DropdownMichelle from './dropdown.jsx';


storiesOf('elements/DropdownMichelle', module)
.add('::empty', () => (
  <div className="app flex-center-middle">
    <DropdownMichelle
    menuItems={[ // Array of menu items
    { // menuItem 1
      value: "Erster Eintrag",
      link: "irgendwohin.com",
    },
    { // menuItem 2
      value: "Zweiter Eintrag",
      link: "irgendwohin.com",
    }]}
    />
  </div>
))

;
