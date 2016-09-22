import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';


const TabHeader = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Tabs
            initialSelectedIndex={props.selectedIndex}
          >
            {(() => (props.members ? props.members.forEach((member, index) =>
              <Tab
                label={member.label}
                value={index}
                onChange={props.handleSelectMember}
              />
            ) : undefined))()}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

TabHeader.propTypes = {
  selectedIndex: React.PropTypes.number,
  members: React.PropTypes.array,
}

export default TabHeader;
