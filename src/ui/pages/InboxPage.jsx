import React from 'react';

import ActionItem from '../elements/ActionItem.jsx';

const InboxPage = props => (
  <div className="container push-top-small">
    <h2>Inbox</h2>
    {props.actionItems ? props.actionItems.map(item =>
      <div key={item.id} className="row">
        <ActionItem
          {...item}
          onPerformAction={props.handlePerformAction}
        />
      </div>) : undefined
    }
  </div>
);

InboxPage.propTypes = {
  actionItems: React.PropTypes.arrayOf(
    React.PropTypes.shape(ActionItem.propTypes)
  ),
  handlePerformAction: React.PropTypes.func,
};

export default InboxPage;
