import React from 'react';

import TextField from 'material-ui/TextField';

import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';


const ListItem = props => (
  <div className="container">
    <div className="row">
      <div className="col-xs-8">
        <TextField
          name={props.id}
          defaultValue={props.text}
          onChange={e => props.onChanged(e.target.value)}
          fullWidth
          disabled={props.readonly || !props.editable}
          inputStyle={{ color: '#333333' }}
        />
      </div>
      <div className="col-xs-2">
        {(!props.readonly && props.editable ?
          props.edit : undefined)
        }
      </div>
      <div className="col-xs-2">
        <FlatButton
          onClick={props.onDelete}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          disabled={props.readonly}
        />
      </div>
    </div>
  </div>
);

ListItem.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  editable: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onChanged: React.PropTypes.func,
  edit: React.PropTypes.element,
};

export default ListItem;
