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
};

export default CriteriaPage;

