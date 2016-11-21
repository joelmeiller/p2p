// React imports
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import InboxPage from '../ui/pages/InboxPage.jsx';

// Action imports
import { fetchInbox, performAction } from '../actions/inbox.js';


const mapStateToProps = (globalState, props) => {
  const { actions } = globalState.inbox;

  const newProps = {
    ...props,
    actions,
  };

  return newProps;
};

const mapDispatchToProps = dispatch => ({
  fetchInbox: () => dispatch(fetchInbox()),
  handlePerformAction: action => dispatch(performAction(action)),
});

const InboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxPage);

export default withRouter(InboxContainer);
