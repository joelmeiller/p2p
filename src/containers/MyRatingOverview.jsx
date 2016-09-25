// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import RatingPage from '../ui/pages/RatingPage.jsx';

// Action imports
import { fetchMyRatingIfNeeded, showMemberRating } from '../actions/myrating.js';
import { setTitle } from '../ui/layouts/app.jsx';


class MyRatingOverviewComponent extends Component {
  componentDidMount() {
    this.props.setTitle();
    this.props.fetchMyRating('test');
  }

  render() {
    return (<RatingPage {...this.props} />);
  }
}

MyRatingOverviewComponent.propTypes = {
  setTitle: React.PropTypes.func,
  fetchMyRating: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { members, rating, isFetching } = globalState.myrating;

  return {
    onClosePath: '/myrating',
    rating,
    members,
    isFetching,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  setTitle: () => dispatch(setTitle('My Rating')),
  fetchMyRating: project => dispatch(fetchMyRatingIfNeeded(project)),
  handleSelectMember: (member, props) => dispatch(showMemberRating(member, props)),
});

const MyRatingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRatingOverviewComponent);

export default withRouter(MyRatingOverview);
