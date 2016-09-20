// React imports
import { connect } from 'react-redux';

// Component imports
import EvaluationPage from '../ui/components/EvaluationPage.jsx';


const mapStateToProps = (globalState, props) => {
  const { members, ...other } = globalState.team;
  console.log(members, props);
  const member = members.find((m) => m.id === props.params.id);

  return {
    members,
    ...member,
    ...other,
  }
};

const TeammemberEvaluation = connect(mapStateToProps)(EvaluationPage);

export default TeammemberEvaluation;
