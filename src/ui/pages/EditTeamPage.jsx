import React from 'react';

import { RaisedButton } from 'material-ui';

import EditableMember, { roleType } from '../components/EditableMember.jsx';


const EditTeamPage = props => (
  <div className="container push-top-small">
    {(props.members.map(member =>
      <div key={member.id} className="row">
        <EditableMember
          {...member}
          readonly={props.readonly}
          onDelete={props.handleDelete}
          onRoleChanged={value => props.handleValueChanged({ role: value }, member.id)}
          onNameChanged={value => props.handleNameChanged({ name: value }, member.id)}
          onEmailChanged={value => props.handleEmailChanged({ email: value }, member.id)}
          editable={false}
          selectRoles={props.roles}
        />
      </div>)
    )}
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

EditTeamPage.propTypes = {
  readonly: React.PropTypes.bool,
  members: React.PropTypes.arrayOf(React.PropTypes.shape(EditableMember.propTypes)).isRequired,
  roles: React.PropTypes.arrayOf(React.PropTypes.shape(roleType)),
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleValueChanged: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
};

export default EditTeamPage;

