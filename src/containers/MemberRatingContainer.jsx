// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import MemberRatingPage from '../ui/pages/MemberRatingPage.jsx';

// Action imports
import { fetchTeam, showMemberRating } from '../actions/team.js';


class MemberRatingComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam();
  }

  render() {
    return (<MemberRatingPage {...this.props} />);
  }
}

MemberRatingComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { user } = globalState.app;
  const { members } = globalState.team;

  let member = {};
  if (members.length > 0) {
    member = props.selectedMemberId ?
      members.find(m => m.id === props.selectedMemberId) :
      members.find(m => m.studentId === user.id);
  }

  return {
    title: 'Rating from',
    onClosePath: '/ip-p2p/team/member/rating',
    ...member,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeam: () => dispatch(fetchTeam()),
  handleSelectMember: (member, props) => dispatch(showMemberRating(member, props)),
});

const MemberRatingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberRatingComponent);

export default withRouter(MemberRatingContainer);
