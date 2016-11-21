import React from 'react';

import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import Header2Line from '../elements/Header/Header2Line.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import AutoSuggest from '../elements/AutoSuggest.jsx';
import getMembersSuggestions from '../../middleware/students/getMemberSuggestions.js';



const EditProjectPage = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title={`Project: ${props.title}`}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Title</p>
      </div>
      <div className="col-xs-6">
        <TextField
          hintText="Title"
          value={props.title}
          fullWidth
          inputStyle={{ color: '#333333' }}
          onChange={e => props.handleTitleChanged(e.target.value)}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Coach</p>
      </div>
      <div className="col-xs-6">
        <TextField
          hintText="Name Coach"
          value={props.coach}
          fullWidth
          inputStyle={{ color: '#333333' }}
          onChange={e => props.handleCoachChanged(e.target.value)}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>QM</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <AutoSuggest
          middleware={getMembersSuggestions}
          onSuggestionSelected={props.handleAddQM}
          {...props}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Projektstufe</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <Dropdown
          items={[
            { id: 'IP3', label: 'IP3' },
            { id: 'IP4', label: 'IP4' },
            { id: 'IP5', label: 'IP5' },
          ]}
          menuItems={props.selectStates}
          selectedValue={props.selectedStateId}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Start</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <DatePicker
          value={props.start}
          onChange={(_, date) => props.handleStartChanged(date)}
          hintText="Project start date"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Stop</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <DatePicker
          value={props.stop}
          onChange={(_, date) => props.handleStopChanged(date)}
          hintText="Project stop date"
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Zeitmodell</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <Dropdown
          items={[
            { id: 'BB', label: 'Berufsbegleitend' },
            { id: 'VZ_TZ', label: 'Vollzeit/Teilzeit' },
          ]}
          selectedValue={props.zeitmodell}
          onChange={props.handleZeitmodellChanged}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Status</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <Dropdown
          items={[
            { id: 'Offen', label: 'Offen' },
            { id: 'IP4', label: 'IP4' },
            { id: 'IP5', label: 'IP5' },
          ]}
          menuItems={props.selectStates}
          selectedValue={props.selectedStateId}
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

EditProjectPage.propTypes = {
  title: React.PropTypes.string,
  start: React.PropTypes.instanceOf(Date),
  stop: React.PropTypes.instanceOf(Date),
  zeitmodell: React.PropTypes.string,
  handleTitleChanged: React.PropTypes.func,
  handleCoachChanged: React.PropTypes.func,
  handleAddQM: React.PropTypes.func,
  handleStartChanged: React.PropTypes.func,
  handleStopChanged: React.PropTypes.func,
  handleZeitmodellChanged: React.PropTypes.func,
  coach: React.PropTypes.string,
  selectStates: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
  selectedStateId: React.PropTypes.string,
  handleCancel: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  readonly: React.PropTypes.bool,
};

export default EditProjectPage;
