// React imports
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { showRating } from '../actions/ratings.js';


const mapStateToProps = (globalState, props) => {
  const { ratings } = globalState.rating;

  return {
    title: 'Rating for',
    ...props,
    ratings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSelectMember: member => dispatch(showRating(member, ownProps)),
});

const TeamRatingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingPage);

export default withRouter(TeamRatingPageContainer);
