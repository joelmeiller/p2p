// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import MemberRatingPage from '../ui/pages/MemberRatingPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import { fetchMyRating } from '../actions/myrating.js';
import { showMember } from '../actions/member.js';


class MyRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchMyRating();
  }

  render() {
    return (<MemberRatingPage {...this.props} />);
  }
}

MyRatingOverviewComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchMyRating: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, rating } = globalState.myrating;
  const readonly = true;

  return {
    title: 'My Rating from',
    onClosePath: '/ip-p2p/myrating',
    rating,
    readonly,
    members,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  initializeTitle: () => dispatch(setTitle('My Ratings')),
  fetchMyRating: () => dispatch(fetchMyRating()),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const MyRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRatingOverviewComponent);

export default withRouter(MyRatingOverview);
