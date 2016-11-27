import React from 'react';

import ActionItem from '../elements/ActionItem.jsx';

const InboxPage = props => (
  <div className="container push-top-small">
    <h2>Inbox</h2>
    {(props.hasActions ? props.actions.map(item =>
      <div key={item.id} className="row">
        <ActionItem
          {...item}
          onPerformAction={props.handlePerformAction}
        />
      </div>) :
      <p>Keine aktuellen Informationen</p>
    )}
  </div>
);

InboxPage.propTypes = {
  actions: React.PropTypes.array,
  hasActions: React.PropTypes.bool,
  handlePerformAction: React.PropTypes.func,
};

export default InboxPage;
