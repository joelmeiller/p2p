// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import TabHeader from '../ui/components/TabHeader.jsx';

// Page imports
import EvaluationPage from '../ui/pages/EvaluationPage.jsx';

// Action imports
import {
  selectRating,
  updateComment,
  updateRating,
  saveRatingAndClose,
  cancelRating,
} from '../actions/ratings.js';

// utils
import calculateProgress from '../middleware/utils/calculateProgress.js';
import getCriteriaValues from '../actions/utils/getCriteriaValues.js';


const EvaluationContainer = props => (
  <div>
    <TabHeader
      members={props.ratings}
      selectedIndex={props.selectedIndex}
      onChange={index => props.handleSelectRating(index, props)}
    />
    <EvaluationPage
      {...props.selectedRating}
      readonly={props.readonly}
      onCommentChanged={props.handleCommentChanged}
      onRatingChanged={props.handleRatingChanged}
      onClose={props.handleClose}
      onCancel={props.handleCancel}
      {...props}
    />
  </div>
);

EvaluationContainer.propTypes = {
  handleSelectRating: React.PropTypes.func,
  handleCommentChanged: React.PropTypes.func,
  handleRatingChanged: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  // categories: React.PropTypes.array.isRequired,
  ratings: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  selectedRating: React.PropTypes.object,
  readonly: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { ratings, values, selectedIndex, ...other } = globalState.rating;
  const selectedRating = ratings[selectedIndex];

  selectedRating.categories = getCriteriaValues(selectedRating, values);
  selectedRating.progress = calculateProgress(selectedRating);

  return {
    ...other,
    ...props,
    ratings,
    selectedIndex,
    selectedRating,
    values,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSelectRating: (index, props) => dispatch(selectRating(index, props)),
  handleCommentChanged: value => dispatch(updateComment(value)),
  handleRatingChanged: (nextValue, prevValue, id) => dispatch(updateRating(nextValue, id)),
  handleClose: () => dispatch(saveRatingAndClose(ownProps)),
  handleCancel: () => dispatch(cancelRating(ownProps)),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default withRouter(TeammemberEvaluation);
