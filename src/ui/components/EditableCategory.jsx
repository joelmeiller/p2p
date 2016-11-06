import React from 'react';

import { RaisedButton } from 'material-ui';

import Header2Line from '../elements/Header/Header2Line.jsx';
import ListItem from '../elements/ListItem.jsx';
import AddCriteria from './AddCriteria.jsx';

const EditableCategory = props => (
  <div className="container" >
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title={props.title}
        />
      </div>
    </div>

    {props.criterias ? props.criterias.map(criteria =>
      <div className="row" key={criteria.criteriaId}>
        <div className="col-xs-12">
          <ListItem
            id={criteria.criteriaId || criteria.label}
            text={criteria.label}
            editable={props.editable}
            edit={(!props.isSelfDefined ?
              <RaisedButton
                label="Edit"
                primary
                onClick={() => props.onEdit(criteria)}
                disabled={props.readonly}
              /> : undefined
            )}
            readonly={props.readonly}
            onBlur={value => props.onValueChanged(value, criteria)}
            onDelete={() => props.onDelete(criteria)}
          />
        </div>
      </div>
    ) : undefined}
    {(!props.readonly ?
      <AddCriteria {...props} /> : undefined
    )}
  </div>
);

EditableCategory.propTypes = {
  title: React.PropTypes.string,
  readonly: React.PropTypes.bool,
  criterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      self: React.PropTypes.bool,
    })
  ),
  onDelete: React.PropTypes.func,
  onEdit: React.PropTypes.func,
};

export default EditableCategory;
