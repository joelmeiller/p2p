// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import RatingPage from '../ui/pages/RatingPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import { fetchMyRatingIfNeeded } from '../actions/myrating.js';
import { showMember } from '../actions/member.js';


class MyRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchMyRating('test');
  }

  render() {
    return (<RatingPage {...this.props} />);
  }
}

MyRatingOverviewComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchMyRating: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, rating, isFetching } = globalState.myrating;
  const readonly = true;

  return {
    title: 'My Rating from',
    onClosePath: '/myrating',
    rating,
    readonly,
    members,
    isFetching,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  initializeTitle: () => dispatch(setTitle('My Ratings')),
  fetchMyRating: project => dispatch(fetchMyRatingIfNeeded(project)),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const MyRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRatingOverviewComponent);

export default withRouter(MyRatingOverview);
