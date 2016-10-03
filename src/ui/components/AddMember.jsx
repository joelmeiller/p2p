import React from 'react';

import { RaisedButton, TextField } from 'material-ui';

import Dropdown from '../elements/Dropdown.jsx';

const AddMember = (props) => {
  const selectRoles = [{
    id: 'XX',
    label: 'Select Role',
    disabled: true,
  }].concat((props.selectRoles || []).map(role =>
    ({ label: role.title, id: role.id })
  ));

  const dropdown = (
    <Dropdown
      items={selectRoles}
      onChange={props.onRoleChanged}
      selectedValue={props.selectedRole || 'XX'}
    />
  );

  return (
    <div className="row">
      <div className="col-xs-3">
        <TextField
          name="addName"
          hintText="Name"
          defaultValue={props.name}
          onChange={e => props.onNameChanged(e.target.value)}
          fullWidth
          inputStyle={{ color: '#333333' }}
        />
      </div>
      <div className="col-xs-4">
        <TextField
          name="addEmail"
          defaultValue={props.email}
          hintText="Email"
          onChange={e => props.onEmailChanged(e.target.value)}
          fullWidth
          inputStyle={{ color: '#333333' }}
        />
      </div>
      <div className="col-xs-3 pull-top-mini">
        {dropdown}
      </div>
      <div className="col-xs-1 push-top-nano">
        <RaisedButton
          label="Add"
          primary
          onClick={props.onAddMember}
          disabled={!props.canAdd}
        />
      </div>
    </div>
  );
};

export const roleType = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};


AddMember.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  selectedRole: React.PropTypes.string,
  onRoleChanged: React.PropTypes.func,
  onNameChanged: React.PropTypes.func,
  onEmailChanged: React.PropTypes.func,
  selectRoles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  onAddMember: React.PropTypes.func,
  canAdd: React.PropTypes.bool,
};

export default AddMember;
