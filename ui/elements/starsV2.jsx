//React Imports
import React from 'react';

//Material Imports
import StarRatingComponent from 'react-star-rating-component';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const StarsRating2 = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
        <StarRatingComponent
          starCount={this.props.startCountMichelle}
          value={this.props.valueEffective}
          />
    );
  },
});

export default StarsRating2;
