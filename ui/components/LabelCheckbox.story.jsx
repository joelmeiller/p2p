
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import InputMichelle from '../elements/inputfield.jsx';
import CheckboxMichelle from '../elements/checkbox.jsx';

storiesOf('components/LabelCheckbox', module)
.add('::test', () => (
  <div className="app flex-center-middle">
    <InputMichelle
      michelle="42 Supergeil"
    />
    <CheckboxMichelle
      checkboxLabel="I'm a nice Checkbox"
    />
  </div>
))
;
