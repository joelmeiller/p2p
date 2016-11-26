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
  let { members, member } = globalState.team;

  if (!props.params.slug) {
    member = members.find(m => m.studentId === user.id);
  }

  return {
    title: 'Rating from',
    onClosePath: `/ip-p2p/team/member/rating/${props.params.slug}`,
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
