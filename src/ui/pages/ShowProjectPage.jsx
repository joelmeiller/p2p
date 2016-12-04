import React from 'react';

import { RaisedButton } from 'material-ui';
import Header2Line from '../elements/Header/Header2Line.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import { PROJECT_LEVELS, ZEITMODELLE } from './CreateProjectPage.jsx';
import { STATUS_MAPPING } from './ProjectPage.jsx';

const getLabel = (items, id) => (items.find(item => item.id === id) || { label: '' }).label;

const isEditable = props => (props.status === 'FINAL') || (props.status === 'CLOSE' && props.stop === null);

const ShowProjectPage = props => (
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
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Title</p>
      </div>
      <div className="col-xs-6">
        <p>{props.title}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Coach</p>
      </div>
      <div className="col-xs-6">
        <p>{props.coach}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>QM</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{props.emailQm}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Level</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{getLabel(PROJECT_LEVELS, props.level)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Zeitmodell</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{getLabel(ZEITMODELLE, props.zeitmodell)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Start</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{(props.start || new Date()).toISOString().substring(0, 10)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
      {/* TODO: i18n */}
        <p>Status</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        {isEditable(props) ?
          <Dropdown
            selectedValue={props.status}
            onChange={props.handleStatusChanged}
            items={[{
              id: 'FINAL',
              label: STATUS_MAPPING.FINAL,
            }, {
              id: 'CLOSE',
              label: STATUS_MAPPING.CLOSE,
            }]}
          /> :
          <p>{STATUS_MAPPING[props.status]}</p>
        }
      </div>
    </div>

    <div className="row push-top-medium">
      {isEditable(props) ?
        <div>
          <div className="col-xs-4 align-right">
          {/* TODO: i18n */}
            <RaisedButton
              label="Cancel"
              onClick={props.handleCancel}
            />
          </div>
          <div className="col-xs-4">
          {/* TODO: i18n */}
            <RaisedButton
              label="Save"
              primary
              onClick={props.handleSave}
            />
          </div>
        </div> :
        <div className="col-xs-4 align-right">
        {/* TODO: i18n */}
          <RaisedButton
            label="Back"
            onClick={props.handleCancel}
          />
        </div>
      }
    </div>
  </div>
);

ShowProjectPage.propTypes = {
  title: React.PropTypes.string,
  coach: React.PropTypes.string,
  emailQm: React.PropTypes.string,
  level: React.PropTypes.string,
  zeitmodell: React.PropTypes.string,
  start: React.PropTypes.instanceOf(Date),
  status: React.PropTypes.string,

  handleStatusChanged: React.PropTypes.func,

  handleCancel: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

export default ShowProjectPage;
