// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import MemberRatingPage from '../ui/pages/MemberRatingPage.jsx';
import ActionItem from '../ui/elements/ActionItem.jsx';

// Action imports
import { fetchTeam, showMemberRating } from '../actions/team.js';
import { performAction } from '../actions/inbox.js';


class MemberRatingComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam();
  }

  render() {
    return (
      <div className="container push-top-small">
        {(this.props.action ?
          <div className="row">
            <ActionItem
              {...this.props.action}
              onPerformAction={this.props.handlePerformAction}
            />
          </div> : undefined
        )}
        <MemberRatingPage {...this.props} />
      </div>
    );
  }
}

MemberRatingComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;
  const { actions } = globalState.inbox;
  let { members, member } = globalState.team;

  if (!props.params.slug) {
    member = members.find(m => m.studentId === user.id);
  }

  return {
    // TODO: i18n
    title: props.params.slug && member ? `Bewertung für ${member.firstName} ${member.lastName}` : 'Deine Bewertung',
    onClosePath: `/ip-p2p/team/member/rating/${props.params.slug}`,
    action: !props.params.slug && actions.find(act => (act.id === '500')),
    ...member,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeam: () => dispatch(fetchTeam()),
  handleSelectMember: (member, props) => dispatch(showMemberRating(member, props)),
  handlePerformAction: action => dispatch(performAction(action)),
});

const MemberRatingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberRatingComponent);

export default withRouter(MemberRatingContainer);
