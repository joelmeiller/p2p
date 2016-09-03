//React Imports
import React from 'react';

//Material Imports
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const InputMichelle = React.createClass({
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
        defaultValue={this.props.michelle}
        value={this.props.value}
        fullWidth
      />
    );
  },
});

export default InputMichelle;
