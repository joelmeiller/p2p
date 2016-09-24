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
} from '../actions/member.js';


const EvaluationContainer = props => (
  <div>
    <TabHeader
      members={props.members}
      selectedIndex={props.selectedIndex}
      onChange={index => props.handleSelectMember(index, props)}
    />
    <EvaluationPage
      {...props.selectedMember}
      categories={props.categories}
      onCommentChanged={props.handleCommentChanged}
      onRatingChanged={props.handleRatingChanged}
    />
  </div>
);

EvaluationContainer.propTypes = {
  handleSelectMember: React.PropTypes.func,
  handleCommentChanged: React.PropTypes.func,
  handleRatingChanged: React.PropTypes.func,
  categories: React.PropTypes.array.isRequired,
  members: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  selectedMember: React.PropTypes.object,
};

const mapStateToProps = (globalState, props) => {
  let { members } = globalState.team;
  const { selectedIndex, values, resetMember } = globalState.member;
  const selectedMember = members[selectedIndex];

  const categories = selectedMember.categories.map(category => ({
    ...category,
    criterias: category.criterias.map((criteria) => {
      const newRating = values.ratings.find(r => r.id === criteria.id);
      const rating = newRating ? { ...newRating, label: criteria.label } : criteria;
      return rating;
    }),
  }));

  if (resetMember) {
    members = members.map(m => (m.id === resetMember.id ? resetMember : m));
  }

  return {
    members,
    selectedIndex,
    selectedMember,
    categories,
    values,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  handleSelectMember: (index, props) => dispatch(selectMember(index, props)),
  handleCommentChanged: value => dispatch(updateComment(value)),
  handleRatingChanged: (nextValue, prevValue, id) => dispatch(updateRating(nextValue, id)),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default withRouter(TeammemberEvaluation);
