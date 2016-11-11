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
  selectMember,
  updateComment,
  updateRating,
  saveMemberAndClose,
  cancelRating,
} from '../actions/member.js';

// utils
import calculateProgress from '../middleware/utils/calculateProgress.js';
import getCriteriaValues from '../actions/utils/getCriteriaValues.js';


const EvaluationContainer = props => (
  <div>
    <TabHeader
      members={props.members}
      selectedIndex={props.selectedIndex}
      onChange={index => props.handleSelectMember(index, props)}
    />
    <EvaluationPage
      {...props.selectedMember}
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
  handleSelectMember: React.PropTypes.func,
  handleCommentChanged: React.PropTypes.func,
  handleRatingChanged: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  // categories: React.PropTypes.array.isRequired,
  members: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  selectedMember: React.PropTypes.object,
  readonly: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members } = globalState.team;
  const { values, selectedIndex, ...other } = globalState.member;
  const selectedMember = members[selectedIndex];

  selectedMember.categories = getCriteriaValues(selectedMember, values);
  selectedMember.progress = calculateProgress(selectedMember);

  return {
    ...other,
    ...props,
    members,
    selectedIndex,
    selectedMember,
    values,
  };
};

const mapDispatchToProps = dispatch => ({
  handleSelectMember: (index, props) => dispatch(selectMember(index, props)),
  handleCommentChanged: value => dispatch(updateComment(value)),
  handleRatingChanged: (nextValue, prevValue, id) => dispatch(updateRating(nextValue, id)),
  handleClose: props => dispatch(saveMemberAndClose(props)),
  handleCancel: props => dispatch(cancelRating),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default withRouter(TeammemberEvaluation);
