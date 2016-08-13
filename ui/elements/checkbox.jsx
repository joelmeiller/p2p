//React Imports
import React from 'react';

//Material Imports
import Checkbox from 'material-ui/Checkbox';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const CheckboxMichelle = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },


  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <div style={styles.block}>
        <Checkbox
          label={this.props.checkboxLabel}
          style={styles.checkbox}
        />
    );
  },
});

export default CheckboxMichelle;
