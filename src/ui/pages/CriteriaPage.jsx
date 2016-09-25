import React from 'react';

import Category from '../components/Category.jsx';


const CriteriaPage = props => (
  <div className="container push-top-small">
    {props.categories ? props.categories.map(category =>
      <div key={category.id} className="row">
        <Category
          {...category}
          readonly={props.readonly}
        />
      </div>) : undefined
    }
  </div>
);

CriteriaPage.propTypes = {
  readonly: React.PropTypes.bool,
  categories: React.PropTypes.array,
};

export default CriteriaPage;

