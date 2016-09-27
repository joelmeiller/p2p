import React from 'react';

import { FlatButton } from 'material-ui';

import Dropdown from '../elements/Dropdown.jsx';
import Header2Line from '../elements/Header/Header2Line.jsx';
import ListItem from '../elements/ListItem.jsx';


const Category = (props) => {
  const dropdown = (
    <Dropdown
      items={props.selectCriterias}
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
              self={criteria.self}
              readonly={props.readonly}
              // onEdit={() => props.onEdit(criteria)}
              onDelete={() => props.onDelete(criteria)}
            />
          </div>
        </div>
      ) : undefined}
      <div className="row">
        <div className="col-xs-8">
          {dropdown}
        </div>
        <div className="col-xs-4">
          <FlatButton
            onClick={() => {
              console.log(dropdown);
              props.onAdd(dropdown.value);
            }}
            icon={<span className="button-text">add</span>}
            disabled={props.readonly}
          />
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  title: React.PropTypes.string,
  readonly: React.PropTypes.bool,
  criterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      self: React.PropTypes.bool,
      onDelete: React.PropTypes.func,
    })
  ),
  selectCriterias: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    })
  ),
  onAdd: React.PropTypes.func,
};

export default Category;
