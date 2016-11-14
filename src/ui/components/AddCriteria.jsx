import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Dropdown from '../elements/Dropdown.jsx';


const AddCriteria = (props) => {
  const selectedCriteriaId = props.selectedCriteriaId ||
    (props.selectCriterias && props.selectCriterias.length > 0 ?
      props.selectCriterias[0].id : undefined);

  const selectCriterias = props.selectCriterias.map(criteria => ({
    id: criteria.criteriaId,
    label: criteria.label,
  }));

  const dropdown = (
    <Dropdown
      items={selectCriterias}
      onChange={props.onChange}
      selectedValue={selectedCriteriaId}
    />
  );

  let addCriteria = <div className="row" />;

  if (props.isSelfDefined) {
    addCriteria = (
      <div className="row">
        <div className="col-xs-10">
          <TextField
            disabled={props.readonly}
            fullWidth
            inputStyle={{ color: '#333333' }}
            name="newSelfDefinedCriteria"
            onChange={e => props.onNewValue(e.target.value)}
            value={props.newValue}
          />
        </div>
        <div className="col-xs-2">
          <RaisedButton
            disabled={props.readonly || props.newValue === ''}
            label="Add"
            onClick={props.onAdd}
            primary
          />
        </div>
      </div>
    );
  } else if (props.selectCriterias && props.selectCriterias.length > 0) {
    addCriteria = (
      <div className="row">
        <div className="col-xs-8">
          {dropdown}
        </div>
        <div className="col-xs-2 push-top-mini">
          <RaisedButton
            label="Add"
            primary
            onClick={props.onAdd}
            disabled={props.readonly || !props.selectedCriteriaId}
          />
        </div>
      </div>
    );
  }
  return addCriteria;
};

AddCriteria.propTypes = {
  id: React.PropTypes.string,
  isSelfDefined: React.PropTypes.bool,
  newValue: React.PropTypes.string,
  onAdd: React.PropTypes.func,
  onValueChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  reset: React.PropTypes.bool,
  selectedCriteriaId: React.PropTypes.string,
  selectCriterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
};

export default AddCriteria;
