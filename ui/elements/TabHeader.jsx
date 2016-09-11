//React Imports
import React from 'react';

//Material Imports
import {Tabs, Tab} from 'material-ui/Tabs';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

const TabHeader = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Tabs>
            {(() => (props.members ? props.members.map((members) =>
              <Tab
                label={members.label}
                />
            ) : undefined))()}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
