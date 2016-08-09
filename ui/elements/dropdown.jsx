//React Imports
import React from 'react';

//Material Imports
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const DropdownMichelle = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },
      render() {
        return (
          <div>
            <DropDownMenu >
              <MenuItem value={this.props.val1} primaryText="Never" />
              <MenuItem value={this.props.val2} primaryText="Every Night" />
              <MenuItem value={this.props.val3} primaryText="Weeknights" />
              <MenuItem value={this.props.val4} primaryText="Weekends" />
              <MenuItem value={this.props.val5} primaryText="Weekly" />
            </DropDownMenu>
          </div>
        );
      },
    });
export default DropdownMichelle;
