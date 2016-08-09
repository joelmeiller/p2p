/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabMichelle from './tab.jsx';

storiesOf('elements/TabMichelle', module)
.add('::empty', () => (
  <div class="slds-tabs--default">
    <ul class="slds-tabs--default__nav" role="tablist"><TabMichelle header1="Tab1"/>
    </ul>
    <ul class="slds-tabs--default__nav" role="tablist"><TabMichelle header2="Tab2"/>
    </ul>
    <ul class="slds-tabs--default__nav" role="tablist"><TabMichelle header3="Tab3"/>
    </ul>
    </div>






))

;
