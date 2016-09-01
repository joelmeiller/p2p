//React Imports
import React from 'react';

//Material Imports
import FlatButton from 'material-ui/FlatButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const CancelButton = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  render() {
    return (
      <div>
        <FlatButton label="cancel" primary={true} />
      </div>
    );
  },
});

export default CancelButton;
