// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import TeamRatingPage from '../ui/pages/TeamRatingPage.jsx';

// Action imports
import { initializeMembers, showRating } from '../actions/ratings.js';

class TeamRatingPageComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.members && nextProps.members
      && this.props.members.length !== nextProps.members.length) {
      this.props.initialize(nextProps.members);
    }
  }

  render() {
    return (
      <TeamRatingPage
        {...this.props}
      />
    );
  }
}

TeamRatingPageComponent.propTypes = {
  members: React.PropTypes.array,
  initialize: React.PropTypes.func,
};


const mapStateToProps = (globalState, props) => {
  const { ratings } = globalState.rating;

  return {
    title: 'Rating for',
    ...props,
    ratings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSelectMember: member => dispatch(showRating(member, ownProps, true)),
  initialize: members => dispatch(initializeMembers(members)),
});

const TeamRatingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamRatingPageComponent);

export default withRouter(TeamRatingPageContainer);
