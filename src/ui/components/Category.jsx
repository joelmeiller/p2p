import React from 'react';

import Header2Line from '../elements/Header/Header2Line.jsx';
import ListItem from '../elements/ListItem.jsx';


const Category = props => (
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
            text={criteria.label}
            self={criteria.self}
            readonly={props.readonly}
            onEdit={() => props.onEditItem(criteria)}
            onDelete={() => props.onDeleteItem(criteria)}
          />
        </div>
      </div>
    ) : undefined}
    <div className="row">
      <div className="col-xs-12">
        <ListItem />
      </div>
    </div>
  </div>
);

Category.propTypes = {
  title: React.PropTypes.string,
  readonly: React.PropTypes.bool,
  criterias: React.PropTypes.arrayOf({
    label: React.PropTypes.string,
    self: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
  })
  ,
};

export default Category;
