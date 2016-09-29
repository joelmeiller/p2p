import React from 'react';

import { RaisedButton } from 'material-ui';

import Category from '../components/Category.jsx';


const CriteriaPage = props => (
  <div className="container push-top-small">
    {(props.categories ? props.categories.map(category =>
      <div key={category.id} className="row">
        <Category
          {...category}
          readonly={props.readonly}
          onDelete={props.handleDelete}
          onAdd={props.handleAdd}
          onChange={value => props.handleChange(value, category.id)}
          onValueChanged={props.handleValueChanged}
          onEdit={props.handleEdit}
          selectedCriteriaId={(category.id === props.selectedCategoryId) ?
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
  categories: React.PropTypes.arrayOf(React.PropTypes.shape(Category.propTypes)),
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

