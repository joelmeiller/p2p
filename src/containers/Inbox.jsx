// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import InboxPage from '../ui/pages/InboxPage.jsx';

// Action imports
import { fetchInbox, performAction } from '../actions/inbox.js';


class InboxComponent extends Component {
  componentDidMount() {
    this.props.fetchInbox();
  }

  render() {
    return (<InboxPage {...this.props} />);
  }
}

InboxComponent.propTypes = {
  fetchInbox: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { actions } = globalState.inbox;

  return {
    actionItems: actions,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchInbox: () => dispatch(fetchInbox()),
  handlePerformAction: action => dispatch(performAction(action)),
});

const Inbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxComponent);

export default withRouter(Inbox);
