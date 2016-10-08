// React imports
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import EditProjectPage from '../ui/pages/EditProjectPage.jsx';


const ProjectOverview = () => (
  <div>
    <h2>Projektübersicht</h2>
    <EditProjectPage
      entries={[{
        projects: "Test",
        lastUpdate: "01.01.2016",
        status: "open",
        teamCoach: "S. Vetter"
      }]}
      handleAdd={console.log} />
  </div>
);

export default ProjectOverview;
