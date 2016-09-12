import React from 'react';
import AppBarHeader from './AppBarHeader.jsx';

import {Tabs, Tab} from 'material-ui/Tabs';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const TabHeaderMember = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <AppBarHeader
            title={props.title}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Tabs>
            {(() => (props.members ? props.members.map((members) =>
              <Tab style={{fontWeight:200}}
                label={members.label}
                />
            ) : undefined))()}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabHeaderMember;
