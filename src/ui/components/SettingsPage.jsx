import React from 'react';

import LabelCheckbox from './labelCheckbox.jsx';
import TabHeaderMember from './TabHeaderMember.jsx';

const SettingsPage = (props) => {
  return (
    <div className="container">
      <div className="row" style={{marginBottom:30}}>
        <div className="col-xs-12">
          <TabHeaderMember
            title={props.title}
            />
        </div>
      </div>
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
};

export default SettingsPage;
