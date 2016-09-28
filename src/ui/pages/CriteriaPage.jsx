import React from 'react';

import Category from '../components/Category.jsx';


const CriteriaPage = props => (
  <div className="container push-top-small">
    {props.categories ? props.categories.map(category =>
      <div key={category.id} className="row">
        <Category
          {...category}
          readonly={props.readonly}
          onDelete={props.handleDelete}
          onAdd={props.handleAdd}
          onChange={value => props.handleChange(value, category.id)}
          onValueChanged={props.handleValueChanged}
          onSave={props.handleSave}
          selectedCriteriaId={(category.id === props.selectedCategoryId) ? props.selectedCriteriaId : undefined}
        />
      </div>) : undefined
    }
  </div>
);

CriteriaPage.propTypes = {
  readonly: React.PropTypes.bool,
  categories: React.PropTypes.array,
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleValueChanged: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  selectedCategoryId: React.PropTypes.string,
  selectedCriteriaId: React.PropTypes.string,
};

export default CriteriaPage;

