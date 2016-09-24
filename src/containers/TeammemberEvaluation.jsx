// React imports
import React from 'react';
import { connect } from 'react-redux';

// Component imports
import TabHeader from '../ui/components/TabHeader.jsx';

// Page imports
import EvaluationPage from '../ui/pages/EvaluationPage.jsx';

// Action imports
import {
  selectMember,
  updateComment,
} from '../actions/member.js';


const EvaluationContainer = (props) => (
  <div>
    <TabHeader
      members={props.members}
      selectedIndex={props.selectedIndex}
      onChange={props.handleSelectMember}
    />
    <EvaluationPage
      {...props.selectedMember}
      onCommentChanged={props.handleCommentChanged}
    />
  </div>
)

EvaluationContainer.propTypes = {
  handleSelectMember: React.PropTypes.func,
  handleCommentChanged: React.PropTypes.func,
  members: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
}

const mapStateToProps = (globalState, props) => {
  const { members } = globalState.team;
  const { selectedIndex, values } = globalState.member;
  const selectedMember = members[selectedIndex];

  return {
    members,
    selectedIndex,
    selectedMember,
    values,
    ...props,
  }
};

const mapDispatchToProps = (dispatch) => ({
  handleSelectMember: (index) => dispatch(selectMember(index)),
  handleCommentChanged: (value) => dispatch(updateComment(value)),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default TeammemberEvaluation;
