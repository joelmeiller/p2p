import classNames from 'classnames';

import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cyan500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { RaisedButton } from 'material-ui';
import Header2Line from '../elements/Header/Header2Line.jsx';
import TextField from 'material-ui/TextField';
import Dropdown from '../elements/Dropdown.jsx';


const EditProjectPage = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Header2Line
            title="Project: IP: KLAV"
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <TextField
            hintText={props.hintText}
            defaultValue={props.defaultValue}
            fullWidth
            inputStyle={{ color: '#333333' }}
            />
        </div>
        <div className="col-xs-4">
          <TextField
            hintText={props.hintText2}
            defaultValue={props.defaultValue2}
            fullWidth
            inputStyle={{ color: '#333333' }}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4" style={{marginTop:-8}}>
          <Dropdown
            menuItems={props.menuItems}
            selectedValue={props.selectedValue}
            />
        </div>
      </div>
      <div className="row push-top-medium">
        <div className="col-xs-4 align-right">
          <RaisedButton
            label="Cancel"
            onClick={props.handleCancel}
            />
        </div>
        <div className="col-xs-4">
          <RaisedButton
            label="Save"
            primary
            onClick={props.handleSave}
            disabled={props.readonly}
            />
        </div>
      </div>
    </div>
  );
};

export default EditProjectPage;
