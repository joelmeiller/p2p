// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';

// Action imports
import { fetchRatings, showRating } from '../actions/ratings.js';

// Utils imports
import calculateProgress from '../middleware/utils/calculateProgress.js';


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


const mapStateToProps = (globalState) => {
  const { ratings } = globalState.rating;

  const updatedRatings = ratings.map(rating => ({
    ...rating,
    progress: calculateProgress(rating),
  }));

  return {
    title: 'Rating for',
    ratings: updatedRatings,
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
