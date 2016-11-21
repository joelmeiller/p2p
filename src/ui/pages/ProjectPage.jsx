import React from 'react';


import { RaisedButton } from 'material-ui';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ProjectPage = props => (
  <div className="container push-top-small">
    <h2>Projektübersicht</h2>

    <div className="row">
      <Table
        fixedHeader
        onRowSelection={props.handleSelectProject}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn
              tooltip="Projektschiene"
              style={{ width: '50px' }}
            >Stufe</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Semster in welchem das Projekt gestartet ist"
              style={{ width: '80px' }}
            >Start</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Berufsbegleitend"
              style={{ width: '90px' }}
            >Zeitmodell</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Projektbezeichnung"
            >Title</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Letzer Update auf dem Prjekt von den Studierenden"
              style={{ width: '100px' }}
            >Last Update</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Projektstatus"
              style={{ width: '120px' }}
            >Status</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Verantwortlicher Coach für dieses Projekt"
            >Team Coach</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {props.projects.map((project, index) => (
            <TableRow key={index} selected={project.selected}>
              <TableRowColumn
                style={{ width: '50px' }}
              >{project.level}</TableRowColumn>
              <TableRowColumn
                style={{ width: '80px' }}
              >{project.start}</TableRowColumn>
              <TableRowColumn
                style={{ width: '90px' }}
              >{project.zeitmodell}</TableRowColumn>
              <TableRowColumn
              >{project.title}</TableRowColumn>
              <TableRowColumn
                style={{ width: '100px' }}
              >{project.lastUpdate}</TableRowColumn>
              <TableRowColumn
                style={{ width: '120px' }}
              >{project.status}</TableRowColumn>
              <TableRowColumn
              >{project.coach}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
        <div className="row">
          <div className="col-xs-4">
            <RaisedButton
              label="Add"
              primary
              onClick={props.handleAddProject}
            />
          </div>
        </div>
  </div>
);

ProjectPage.propTypes = {
  projects: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string,
      lastUpdate: React.PropTypes.string,
      status: React.PropTypes.string,
      coach: React.PropTypes.string,
    })
  ),
  handleSelectProject: React.PropTypes.func,
  handleAddProject: React.PropTypes.func,
};

export default ProjectPage;
