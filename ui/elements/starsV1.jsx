//React Imports
import React from 'react';

//Material Imports
import Rater from 'react-rater'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const StarsRating = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <Rater
      total={this.props.totalRating}
      rating={this.props.actualRating}
      />
    );
  },
});

export default StarsRating;
