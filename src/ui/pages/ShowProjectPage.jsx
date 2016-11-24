import React from 'react';

import { RaisedButton } from 'material-ui';
import Header2Line from '../elements/Header/Header2Line.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import { PROJECT_LEVELS, ZEITMODELLE } from './CreateProjectPage.jsx';

const getLabel = (items, id) => (items.find(item => item.id === id) || { label: '' }).label;

const ShowProjectPage = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title={`Project: ${props.title}`}
        />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Title</p>
      </div>
      <div className="col-xs-6">
        <p>{props.title}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Coach</p>
      </div>
      <div className="col-xs-6">
        <p>{props.coach}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>QM</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{props.qmName}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Level</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{getLabel(PROJECT_LEVELS, props.level)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Zeitmodell</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{getLabel(ZEITMODELLE, props.zeitmodell)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Start</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <p>{(props.start || new Date()).toISOString().substring(0, 10)}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-2" style={{ marginTop: 0 }}>
        <p>Status</p>
      </div>
      <div className="col-xs-4" style={{ marginTop: 0 }}>
        <Dropdown
          selectedValue={props.stop == null ? 'open' : 'closed'}
          onChange={value => props.handleStopChanged(value === 'open' ? null : new Date())}
          items={[{
            id: 'open',
            label: 'Open',
          }, {
            id: 'closed',
            label: 'Closed',
          }]}
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

ShowProjectPage.propTypes = {
  title: React.PropTypes.string,
  coach: React.PropTypes.string,
  qmName: React.PropTypes.string,
  level: React.PropTypes.string,
  zeitmodell: React.PropTypes.string,
  start: React.PropTypes.instanceOf(Date),
  stop: React.PropTypes.instanceOf(Date),

  handleStopChanged: React.PropTypes.func,

  handleCancel: React.PropTypes.func,
  handleSave: React.PropTypes.func,
};

export default ShowProjectPage;
