// React Imports
import React from 'react';

// Material Imports
import MaterialCheckbox from 'material-ui/Checkbox';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Checkbox = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },


  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <MaterialCheckbox
        label={this.props.checkboxLabel}
      />
    );
  },
});

export default Checkbox;
