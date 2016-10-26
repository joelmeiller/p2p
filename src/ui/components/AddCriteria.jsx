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

  let addCriteria;

  if (props.isSelfDefined) {
    addCriteria = (
      <div className="row">
        <div className="col-xs-10">
          <TextField
            name={props.id}
            onChange={e => props.onValueChanged(e.target.value)}
            fullWidth
            disabled={props.readonly}
            inputStyle={{ color: '#333333' }}
          />
        </div>
        <div className="col-xs-2">
          <RaisedButton
            label="Add"
            primary
            onClick={props.onAdd}
            disabled={props.readonly}
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
  selectedCriteriaId: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  selectCriterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
  onAdd: React.PropTypes.func,
};

export default AddCriteria;
