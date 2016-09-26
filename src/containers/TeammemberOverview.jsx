// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import { fetchTeam } from '../actions/team.js';
import { showMember } from '../actions/member.js';

// Middleware
import calculateProgress from '../middleware/utils/calculateProgress.js';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.setTitle();
    this.props.fetchTeam(this.props.isQM);
  }

  render() {
    return (this.props.isQM ?
      <TeamRatingPage {...this.props} /> :
      <ProgressPage {...this.props} />);
  }
}

TeammemberOverviewComponent.propTypes = {
  setTitle: React.PropTypes.func,
  fetchTeam: React.PropTypes.func,
  isQM: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members, readonly, isFetching } = globalState.team;
  const { user } = globalState.app;

  const isFinal = props.params.test === 'final';
  const isQM = props.params.test === 'isQM' || user.isQM;

  const isReadonly = readonly || isFinal;

  let updatedMembers;
  updatedMembers = members.map(member => ({
    ...member,
    progress: calculateProgress(member),
  }));

  if (props.params.test === 'new') {
    updatedMembers = members.map(m => ({
      ...m,
      progress: 0,
      categories: m.categories.map(cat => ({
        ...cat,
        criterias: cat.criterias.map(crit => ({
          ...crit,
          rating: 0,
        })),
      })),
      comment: '',
    }));
  }

  return {
    title: 'Rating for',
    isQM,
    readonly: isReadonly,
    members: updatedMembers,
    isFetching,
    isFinal,
    testParam: props.params.test,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  setTitle: () => dispatch(setTitle('Dashboard')),
  fetchTeam: asQM => dispatch(fetchTeam(asQM)),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const TeammemberOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent);

export default withRouter(TeammemberOverview);
