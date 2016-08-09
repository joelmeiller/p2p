//React Imports
import React from 'react';

//Material Imports
import {Tabs, Tab} from 'material-ui/Tabs';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const TabMichelle = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

render() {
  return(
    <Tabs>
      <Tab label={this.props.header1}>
      </Tab>
      <Tab label={this.props.header2}>
      </Tab>
      <Tab label={this.props.header3}>
      </Tab>
    </Tabs>
  );
},
});

  export default TabMichelle;
