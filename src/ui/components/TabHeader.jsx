import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';


const TabHeader = (props) => {
  return (
    <div className="nav">
      <Tabs
        initialSelectedIndex={props.selectedIndex}
        onChange={props.onChange}
      >
        {props.members.map((member, i) =>
          <Tab
            key={`tab-${i}`}
            label={member.name}
            value={i}
          />
        )}
      </Tabs>
    </div>
  );
};

TabHeader.propTypes = {
  selectedIndex: React.PropTypes.number,
  members: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
}

TabHeader.defaultProps = {
  selectedIndex: 0,
}

export default TabHeader;
