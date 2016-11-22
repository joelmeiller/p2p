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
      <div className="container push-top-small">
        <h2>Bewertungsfortschritt</h2>
        {(this.props.rating.isNew ?
          <p>Bevor du deine Ratings abgeben kannst, musst du bestätigen, dass du richtig in diesem Projekt eingeteilt bist.</p> :
          <ProgressPage {...this.props} />
        )}
      </div>
    );
  }
}

ProgressPageComponent.propTypes = {
  rating: React.PropTypes.object,
  ratings: React.PropTypes.array,
  initialize: React.PropTypes.func,
};


const mapStateToProps = (globalState) => {
  const { rating } = globalState.app;
  const { ratings } = globalState.rating;

  const updatedRatings = ratings.map(rating => ({
    ...rating,
    progress: calculateProgress(rating),
  }));

  return {
    title: 'Rating for',
    rating,
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
