/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import TextBlock from './textBlock.jsx';


storiesOf('elements/TextBlock', module)
.add('empty', () => (
  <div className="app flex-center-middle">
    <TextBlock
      name="emptyBlock"
      id="empty-text"
    />
  </div>
))
.add('normal', () => (
  <div className="app flex-center-middle">
    <TextBlock
      name="normalBlock"
      id="normal-text"
      title="Hello World"
      text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    />
  </div>
))
;
