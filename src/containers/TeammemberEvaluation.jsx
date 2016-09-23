// React imports
import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

// Component imports
import TabHeader from '../ui/components/TabHeader.jsx';

// Page imports
import EvaluationPage from '../ui/pages/EvaluationPage.jsx';

// Action imports
import { selectMember } from '../actions/member.js';


const EvaluationContainer = (props) => (
  <div>
    <TabHeader
      members={props.members}
      selectedIndex={props.selectedIndex}
      onChange={props.handleSelectMember}
    />
    <SwipeableViews
      index={props.selectedIndex}
      onChangeIndex={props.handleSelectMember}
    >
      {(() => props.members.map(member =>
        <EvaluationPage key={member.id} {...member} />
      ))()}
    </SwipeableViews>
  </div>
)

EvaluationContainer.propTypes = {
  handleSelectMember: React.PropTypes.func,
  members: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
}

const mapStateToProps = (globalState, props) => {
  const { selectedIndex, members } = globalState.team;

  return {
    members,
    selectedIndex,
    ...props,
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  handleSelectMember: (index) => dispatch(selectMember(index)),
});

const TeammemberEvaluation = connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationContainer);

export default TeammemberEvaluation;
