//React Imports
import React from 'react';

//Material Imports
import CheckboxMichelle from '../elements/checkbox.jsx';
import InputMichelle from '../elements/inputfield.jsx';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const LabelCheckbox = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

    getChildContext() {
      return {muiTheme: getMuiTheme(baseTheme)};
    },

    render() {
      return (
        <Checkbox
            label={this.props.checkboxLabel}
        />
        <TextField
            defaultValue={this.props.michelle}
        />
      );
    },
  });
  export default LabelCheckbox;
