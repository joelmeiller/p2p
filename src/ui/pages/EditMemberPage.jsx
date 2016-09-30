import React from 'react';

import { RaisedButton } from 'material-ui';

import EditableMember from '../components/EditableMember.jsx';


const EditMemberPage = props => (
  <div className="container push-top-small">
    {(props.members.map(member =>
      <div key={member.id} className="row">
        <EditableMember
          {...member}
          readonly={props.readonly}
          onDelete={props.handleDelete}
          onRoleChanged={value => props.handleRoleChanged(value, member.id)}
          onNameChanged={value => props.handleNameChanged(value, member.id)}
          onEmailChanged={value => props.handleEmailChanged(value, member.id)}
          editable={false}
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

EditMemberPage.propTypes = {
  readonly: React.PropTypes.bool,
  members: React.PropTypes.arrayOf(React.PropTypes.shape(EditableMember.propTypes)).isRequired,
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleRoleChanged: React.PropTypes.func,
  handleNameChanged: React.PropTypes.func,
  handleEmailChanged: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  selectedCategoryId: React.PropTypes.string,
  selectedCriteriaId: React.PropTypes.string,
};

export default EditMemberPage;

