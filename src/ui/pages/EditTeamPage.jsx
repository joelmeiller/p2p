import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import EditableMember, { roleType } from '../components/EditableMember.jsx';
import Header2Line from '../elements/Header/Header2Line.jsx';
import AutoSuggest from '../elements/AutoSuggest.jsx';

import sortMembers from '../utils/sortMembers.js';

import getMembersSuggestions from '../../middleware/students/getMemberSuggestions.js';


const EditTeamPage = props => (
  <div className="container push-top-small">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title={props.title}
        />
      </div>
    </div>
    <div className="push-top-small">
      {(props.members.sort(sortMembers).map(member =>
        <div
          key={member.studentId}
          className="push-bottom-small"
        >
          <EditableMember
            {...member}
            readonly={props.readonly}
            onDelete={() => props.handleDelete(member)}
            onRoleChanged={value => props.handleRoleChanged({ roleId: value }, member)}
            selectRoles={props.roles}
          />
        </div>)
      )}
    </div>
    {(!props.readonly ?
      <div className="row push-top-medium">
        <div className="col-xs-4 align-right">
          <AutoSuggest
            middleware={getMembersSuggestions}
            onSuggestionSelected={props.handleAdd}
            {...props}
          />
        </div>
      </div> : undefined
    )}
    <div className="row push-top-large">
      <div className="col-xs-4 align-right">
      {/* TODO: i18n */}
        <RaisedButton
          label={props.readonly ? 'Back' : 'Cancel'}
          onClick={props.handleCancel}
        />
      </div>
      {(!props.readonly ?
        <div className="col-xs-4">
        {/* TODO: i18n */}
          <RaisedButton
            label="Save"
            primary
            onClick={props.handleSave}
          />
        </div> : undefined
      )}
    </div>
  </div>
);

EditTeamPage.propTypes = {
  readonly: React.PropTypes.bool,
  members: React.PropTypes.arrayOf(React.PropTypes.shape(EditableMember.propTypes)),
  newMemberRoleId: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(React.PropTypes.shape(roleType)),
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  selectedRole: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default EditTeamPage;
