import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';


const TabHeader = props => (
  <div className="nav">
    <Tabs
      initialSelectedIndex={props.selectedIndex}
      onChange={props.onChange}
    >
      {props.members.map((member, index) =>
        <Tab
          key={member.id}
          label={member.name}
          value={index}
        />
      )}
    </Tabs>
  </div>
);

TabHeader.propTypes = {
  selectedIndex: React.PropTypes.number,
  members: React.PropTypes.arrayOf({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
  }).isRequired,
  onChange: React.PropTypes.func,
};

TabHeader.defaultProps = {
  selectedIndex: 0,
};

export default TabHeader;
