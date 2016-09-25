import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cyan500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const ProjectList = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{color:cyan500}}>Projects</TableHeaderColumn>
                <TableHeaderColumn style={{color:cyan500}}>Last Update</TableHeaderColumn>
                <TableHeaderColumn style={{color:cyan500}}>Status</TableHeaderColumn>
                <TableHeaderColumn style={{color:cyan500}}>Team Coach</TableHeaderColumn>
                <TableHeaderColumn style={{color:cyan500}}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {(() => (props.entries ? props.entries.map((entry) =>
                <TableRow>
                  <TableRowColumn>{entry.projects}</TableRowColumn>
                  <TableRowColumn>{entry.lastUpdate}</TableRowColumn>
                  <TableRowColumn>{entry.status}</TableRowColumn>
                  <TableRowColumn>{entry.teamCoach}</TableRowColumn>
                  <TableRowColumn><FontIcon className="material-icons">edit</FontIcon></TableRowColumn>
                  />
              </TableRow>
            ) : undefined))()}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);
};

export default ProjectList;
