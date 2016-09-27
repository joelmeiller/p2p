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
          value={props.text}
          fullWidth
          disabled={props.readonly || !props.self}
          inputStyle={{ color: '#333333' }}
        />
      </div>
      {(!props.readonly ?
        <div className="col-xs-4">
          <FlatButton
            // onClick={props.onEdit()}
            icon={<FontIcon className="material-icons">edit</FontIcon>}
            disabled={props.readonly || !props.self}
          />
          <FlatButton
            onClick={props.onDelete}
            icon={<FontIcon className="material-icons">delete</FontIcon>}
            disabled={props.readonly}
          />
        </div> : undefined)
      }
    </div>
  </div>
);

ListItem.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string.isRequired,
  self: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

export default ListItem;
