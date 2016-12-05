import React from 'react';

import TextField from 'material-ui/TextField';
import { RaisedButton, FlatButton, FontIcon } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import Header2Line from '../elements/Header/Header2Line.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import AutoSuggest from '../elements/AutoSuggest.jsx';
import getMembersSuggestions from '../../middleware/students/getMemberSuggestions.js';

export const PROJECT_LEVELS = [
  { id: 'IP3', label: 'IP3' },
  { id: 'IP4', label: 'IP4' },
  { id: 'IP5', label: 'IP5' },
];

// TODO: i18n
export const ZEITMODELLE = [
  { id: 'BB', label: 'Berufsbegleitend' },
  { id: 'VZ_TZ', label: 'Vollzeit/Teilzeit' },
];

const CreateProjectPage = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
      {/* TODO: i18n */}
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
      {/* TODO: i18n */}
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
      {/* TODO: i18n */}
        <p>Coach</p>
      </div>
      <div className="col-xs-6">
      {/* TODO: i18n */}
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
      <div className="col-xs-4" style={{ marginTop: 15 }}>
        {(props.emailQm ?
          <div className="row">
            <div className="col-xs-10">
              {props.emailQm}
            </div>
            <div className="col-xs-2">
              <FlatButton
                onClick={() => props.handleQmNameChanged('')}
                icon={<FontIcon className="material-icons">edit</FontIcon>}
              />
            </div>
          </div>
          :
          <AutoSuggest
            middleware={getMembersSuggestions}
            onSuggestionSelected={props.handleQmNameChanged}
          />
        )}
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
        <p>Level</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <Dropdown
          items={PROJECT_LEVELS}
          selectedValue={props.level}
          onChange={props.handleLevelChanged}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
      {/* TODO: i18n */}
        <p>Zeitmodell</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
        <Dropdown
          items={ZEITMODELLE}
          selectedValue={props.zeitmodell}
          onChange={props.handleZeitmodellChanged}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 14 }}>
      {/* TODO: i18n */}
        <p>Start</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: -8 }}>
      {/* TODO: i18n */}
        <DatePicker
          value={props.start}
          onChange={(_, date) => props.handleStartChanged(date)}
          hintText="Project start date"
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
        />
      </div>
    </div>
  </div>
);

CreateProjectPage.propTypes = {
  title: React.PropTypes.string,
  coach: React.PropTypes.string,
  emailQm: React.PropTypes.string,
  level: React.PropTypes.string,
  zeitmodell: React.PropTypes.string,
  start: React.PropTypes.instanceOf(Date),

  handleTitleChanged: React.PropTypes.func,
  handleCoachChanged: React.PropTypes.func,
  handleQmNameChanged: React.PropTypes.func,
  handleLevelChanged: React.PropTypes.func,
  handleZeitmodellChanged: React.PropTypes.func,
  handleStartChanged: React.PropTypes.func,

  handleCancel: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

export default CreateProjectPage;
