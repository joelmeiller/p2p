//React Imports
import React from 'react';

//Material Imports
import {Tabs, Tab} from 'material-ui/Tabs';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
}

const TabHeader = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
        <Tabs>
            <Tab label={props.tab1}></Tab>
            <Tab label={props.tab2}></Tab>
            <Tab label={props.tab3}></Tab>
            <Tab label={props.tab4}></Tab>
            <Tab label={props.tab5}></Tab>
            <Tab label={props.tab6}></Tab>
            <Tab label={props.tab7}></Tab>
            <Tab label={props.tab8}></Tab>
      </Tabs>
      </div>
    </div>
  </div>
        );
      };

export default TabHeader;
