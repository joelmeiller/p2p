// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';
import ActionItem from '../ui/elements/ActionItem.jsx';

// Action imports
import { fetchRatings, showRating } from '../actions/ratings.js';
import { performAction } from '../actions/inbox.js';

// Utils imports
import calculateProgress from '../middleware/utils/calculateProgress.js';


class ProgressPageComponent extends React.Component {
  componentDidMount() {
    this.props.fetchRatings();
  }

  render() {
    return (
      <div className="container push-top-small">
        {(this.props.user.isQM && this.props.action ?
          <div className="row">
            <ActionItem
              {...this.props.action}
              onPerformAction={this.props.handlePerformAction}
            />
          </div> : undefined
        )}
      {/* TODO: i18n */}
        <h2>Bewertungsfortschritt</h2>
        {(this.props.rating.isNew ?
          <p>Bevor du deine Ratings abgeben kannst, musst du bestätigen, dass du richtig in diesem Projekt eingeteilt bist.</p> :
          <ProgressPage
            ratings={this.props.ratings}
            handleSelectRating={this.props.handleSelectRating}
          />
        )}
      </div>
    );
  }
}

ProgressPageComponent.propTypes = {
  user: React.PropTypes.object,
  action: React.PropTypes.object,
  rating: React.PropTypes.object,
  ratings: React.PropTypes.array,
  fetchRatings: React.PropTypes.func,
  handlePerformAction: React.PropTypes.func,
};


const mapStateToProps = (globalState) => {
  const { rating, user } = globalState.app;
  const { ratings } = globalState.rating;
  const { actions } = globalState.inbox;

  const updatedRatings = ratings.map(rat => ({
    ...rat,
    progress: calculateProgress(rat),
  }));

  return {
    title: 'Rating for',
    user,
    action: actions.find(act => (act.id === '300')),
    rating,
    ratings: updatedRatings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRatings: () => dispatch(fetchRatings()),
  handleSelectRating: rating => dispatch(showRating(rating, ownProps)),
  handlePerformAction: action => dispatch(performAction(action)),
});

const ProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressPageComponent);

export default withRouter(ProgressPageContainer);
