import React from 'react';

import { FontIcon, FlatButton, TextField } from 'material-ui';

import Dropdown from '../elements/Dropdown.jsx';

const EditableMember = (props) => {
  const selectRoles = props.selectRoles ? props.selectRoles.filter(selectRole =>
    !props.roles.find(role => role.type === selectRole.type))
    .map(role => ({ label: role.title, value: role })) : [];

  const activeRole = props.roles.filter(r => r.active)
  console.log(activeRole);

  const dropdown = (
    <Dropdown
      items={selectRoles}
      onChange={props.onRoleChanged}
      selectedValue={activeRole}
      disabled={props.readonly || props.self}
    />
  );

  return (
    <div className="row">
      <div className="col-xs-3">
        <TextField
          name={props.id}
          defaultValue={props.name}
          onChange={e => props.onNameChanged(e.target.value)}
          fullWidth
          disabled={props.readonly || !props.editable}
          inputStyle={{ color: '#333333' }}
        />
      </div>
      <div className="col-xs-4">
        <TextField
          name={props.id}
          defaultValue={props.email}
          onChange={e => props.onEmailChanged(e.target.value)}
          fullWidth
          disabled={props.readonly || !props.editable}
          inputStyle={{ color: '#333333' }}
        />
      </div>
      <div className="col-xs-3 pull-top-mini">
        {dropdown}
      </div>
      <div className="col-xs-1 push-top-nano">
        <FlatButton
          onClick={() => props.onDelete(props.id)}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          disabled={props.readonly}
        />
      </div>
    </div>
  );
};

const roleType = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};

EditableMember.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  editable: React.PropTypes.bool,
  self: React.PropTypes.bool,
  onRoleChanged: React.PropTypes.func,
  onNameChanged: React.PropTypes.func,
  onEmailChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  selectedRole: React.PropTypes.objectOf(
    React.PropTypes.shape(roleType)
  ),
  selectRoles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  onAdd: React.PropTypes.func,
  onDelete: React.PropTypes.func,
};

export default EditableMember;
