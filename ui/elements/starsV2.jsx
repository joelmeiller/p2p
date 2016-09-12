import React from 'react';

import StarRatingComponent from 'react-star-rating-component';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Note : props.name must be unique. Using the same props.name for different
//        StarsRating2 will result in the ratings to be "connected".

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
          starCount={5}
          value={this.props.value}
          name={this.props.name}
          />
    );
  },
});

export default StarsRating2;
