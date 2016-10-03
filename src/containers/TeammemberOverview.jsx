// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import ProgressPage from '../ui/pages/ProgressPage.jsx';
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { fetchTeam } from '../actions/team.js';
import { showMember } from '../actions/member.js';

// Utils impors
import calculateProgress from '../middleware/utils/calculateProgress.js';


class TeammemberOverviewComponent extends Component {
  componentDidMount() {
    this.props.fetchTeam(this.props.isQM);
  }

  render() {
    return (this.props.isQM || this.props.isFinal ?
      <div className="container push-top-small">
        <h2>Bewertungsübersicht</h2>
        <TeamRatingPage {...this.props} />
      </div> :
      <div className="container push-top-small">
        <h2>Bewertungsfortschritt</h2>
        <ProgressPage {...this.props} />
      </div>);
  }
}

TeammemberOverviewComponent.propTypes = {
  fetchTeam: React.PropTypes.func,
  isQM: React.PropTypes.bool,
  isFinal: React.PropTypes.bool,
};

const mapStateToProps = (globalState, props) => {
  const { members, readonly } = globalState.team;

  const updatedMembers = members.map(member => ({
    ...member,
    progress: calculateProgress(member),
  }));

  return {
    title: 'Rating for',
    readonly,
    members: updatedMembers,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTeam: () => dispatch(fetchTeam()),
  handleSelectMember: (member, props) => dispatch(showMember(member, props)),
});

const TeammemberOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeammemberOverviewComponent);

export default withRouter(TeammemberOverview);
