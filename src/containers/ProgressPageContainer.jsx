// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';

// Action imports
import { fetchRatings, showRating } from '../actions/ratings.js';

class ProgressPageComponent extends React.Component {
  componentDidMount() {
    this.props.fetchRatings();
  }

  render() {
    return (
      <ProgressPage
        {...this.props}
      />
    );
  }
}

ProgressPageComponent.propTypes = {
  ratings: React.PropTypes.array,
  initialize: React.PropTypes.func,
};


const mapStateToProps = (globalState, props) => {
  const { ratings } = globalState.rating;

  return {
    title: 'Rating for',
    ...props,
    ratings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSelectRating: rating => dispatch(showRating(rating, ownProps, false)),
  fetchRatings: () => dispatch(fetchRatings()),
});

const ProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressPageComponent);

export default withRouter(ProgressPageContainer);
