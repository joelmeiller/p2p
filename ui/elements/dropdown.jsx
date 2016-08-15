//React Imports
import React from 'react';

//Material Imports
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class DropdownMichelle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <DropDownMenu >
          {/*(() => (this.props.menuItems) ? (this.props.menuItems.map((menuItem) =>
            <MenuItem value={menuItem.value} /> : undefined))
          )()*/}
        </DropDownMenu>
      </div>
    );
  }
};

DropdownMichelle.propTypes = {
  menuItems: React.PropTypes.array,
}

DropdownMichelle.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};


export default DropdownMichelle;
