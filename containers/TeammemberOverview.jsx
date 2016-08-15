import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectProject, fetchTeamIfNeeded, invalidateProject } from '../actions/team.js';

import Team from '../components/Team.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTeamIfNeeded(selectedProject));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProject !== this.props.selectedProject) {
      const { dispatch, selectedProject } = nextProps;
      dispatch(fetchTeamIfNeeded(selectedProject));
    }
  }

  handleChange(nextProject) {
    this.props.dispatch(selectProject(nextProject));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedProject } = this.props;
    dispatch(invalidateProject(selectedProject));
    dispatch(fetchTeamIfNeeded(selectedProject));
  }

  render() {
    const { selectedProject, team, isFetching, lastUpdated } = this.props;
    const isEmpty = team.length === 0;
    return (
      <div>
        <Picker value={selectedProject}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Team team={team} />
            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedProject: PropTypes.string.isRequired,
  team: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedProject, teamByProject } = state
  const {
    isFetching,
    lastUpdated,
    items: team
  } = teamByProject[selectedProject] || {
    isFetching: true,
    items: []
  }

  return {
    selectedProject,
    team,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
