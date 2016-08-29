//React Imports
import React from 'react';

//Material Imports
import LinearProgress from 'material-ui/LinearProgress';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const ProgressMichelle = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <LinearProgress
      mode="determinate"
      value={this.props.valueProgress}
      />
    );
  },
});

export default ProgressMichelle;
