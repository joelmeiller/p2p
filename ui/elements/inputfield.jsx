import React from 'react';

import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Inputfield = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <TextField
        hintText={this.props.hintText}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        fullWidth
      />
    );
  },
});

export default Inputfield;
