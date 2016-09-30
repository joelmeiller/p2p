import React from 'react';

import { RaisedButton } from 'material-ui';

import Dropdown from '../elements/Dropdown.jsx';
import Header2Line from '../elements/Header/Header2Line.jsx';
import ListItem from '../elements/ListItem.jsx';


const EditableCategory = (props) => {
  const selectedCriteriaId = props.selectedCriteriaId ||
    (props.selectCriterias && props.selectCriterias.length > 0 ?
      props.selectCriterias[0].id : undefined);

  const dropdown = (
    <Dropdown
      items={props.selectCriterias}
      onChange={props.onChange}
      selectedValue={selectedCriteriaId}
    />
  );

  return (
    <div className="container" >
      <div className="row">
        <div className="col-xs-12">
          <Header2Line
            title={props.title}
          />
        </div>
      </div>
      {props.criterias ? props.criterias.map(criteria =>
        <div className="row" key={criteria.id}>
          <div className="col-xs-12">
            <ListItem
              id={criteria.id}
              text={criteria.label}
              editable={criteria.self}
              edit={<RaisedButton
                label="Save"
                primary
                onClick={() => props.onEdit(criteria.id, props.id)}
                disabled={props.readonly}
              />}
              readonly={props.readonly}
              onChanged={value => props.onValueChanged(value, criteria.id, props.id)}
              onDelete={() => props.onDelete(criteria)}
            />
          </div>
        </div>
      ) : undefined}
      {(props.selectCriterias && props.selectCriterias.length > 0 ?
        <div className="row">
          <div className="col-xs-8">
            {dropdown}
          </div>
          <div className="col-xs-2 push-top-mini">
            <RaisedButton
              label="Add"
              primary
              onClick={() => props.onAdd(props.id)}
              disabled={props.readonly || !props.selectedCriteriaId}
            />
          </div>
        </div> : undefined)
      }
    </div>
  );
};

EditableCategory.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  selectedCriteriaId: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onValueChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  criterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      self: React.PropTypes.bool,
    })
  ),
  selectCriterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
  onAdd: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onEdit: React.PropTypes.func,
};

export default EditableCategory;
