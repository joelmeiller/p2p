import React from 'react';

import { RaisedButton } from 'material-ui';

import EditableCategory from '../components/EditableCategory.jsx';

import sortCategories from '../utils/sortCategories.js';


const CriteriaPage = props => (
  <div className="container push-top-small">
    {(props.categories ? props.categories.sort(sortCategories).map(category =>
      <div key={category.id} className="row">
        <EditableCategory
          {...category}
          newValue={props.newValue}
          readonly={props.readonly}
          onDelete={props.handleDelete}
          onAdd={() => props.handleAdd(category)}
          onChange={value => props.handleChange(value, category)}
          onValueChanged={(value, criteria) => props.handleValueChanged(value, criteria, category)}
          onNewValue={value => props.handleNewValue(value, category)}
          onEdit={props.handleEdit}
          selectedCriteriaId={(category.categoryId === props.selectedCategoryId) ?
            props.selectedCriteriaId : undefined
          }
        />
      </div>) : undefined)
    }
    <div className="row push-top-large">
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

CriteriaPage.propTypes = {
  readonly: React.PropTypes.bool,
  categories: React.PropTypes.arrayOf(React.PropTypes.shape(EditableCategory.propTypes)),
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleValueChanged: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  selectedCategoryId: React.PropTypes.string,
  selectedCriteriaId: React.PropTypes.string,
};

export default CriteriaPage;

