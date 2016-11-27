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

const dateToTerm = date => (date.getMonth() + 1 >= 9 || date.getMonth() + 1 <= 2 ? 'HS' : 'FS') + (date.getYear() % 100);

export const STATUS_MAPPING = {
  OPEN: 'Offen',
  FINAL: 'Final',
  CLOSE: 'Closed',
};

const ProjectPage = props => (
  <div className="container push-top-small">
    <h2>Projekt overview</h2>

    <div className="row">
      <Table
        fixedHeader
        onRowSelection={selection => props.handleSelectProject(props.projects[selection[0]])}
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
            >Level</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Semster in welchem das Projekt gestartet ist"
              style={{ width: '90px' }}
            >Start</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Berufsbegleitend"
              style={{ width: '90px' }}
            >ZM</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Zeitmodell"
            >Title</TableHeaderColumn>
            <TableHeaderColumn
              tooltip="Projektstatus"
              style={{ width: '100px' }}
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
                style={{ width: '90px' }}
              >{dateToTerm(project.start)}</TableRowColumn>
              <TableRowColumn
                style={{ width: '90px' }}
              >{project.zeitmodell}</TableRowColumn>
              <TableRowColumn>{project.title}</TableRowColumn>
              <TableRowColumn
                style={{ width: '100px' }}
              >{STATUS_MAPPING[project.status]}</TableRowColumn>
              <TableRowColumn>{project.coach}</TableRowColumn>
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
