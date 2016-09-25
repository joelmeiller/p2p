import React from 'react';

import LabelCheckbox from '../elements/LabelCheckbox.jsx';

const SettingsPage = props => (
  <div className="container">
    {(() => (props.entries ? props.entries.map((entry) =>
      <div className="row">
        <div className="col-xs-12">
          <LabelCheckbox
            text={entry.title}
          />
        </div>
      </div>
    ) : undefined))()}
  </div>
);


export default SettingsPage;
