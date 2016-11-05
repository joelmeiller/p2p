import classNames from 'classnames';

import React from 'react';

import { RaisedButton } from 'material-ui';

import EditableMember, { roleType } from '../components/EditableMember.jsx';
import Header2Line from '../elements/Header/Header2Line.jsx';
import AutoSuggest from '../elements/AutoSuggest.jsx';

import getMembersSuggestions from '../../middleware/getMemberSuggestions.js';

const EditTeamPage = props => (
  <div className="container push-top-small">
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
          title="Teammembers"
        />
      </div>
    </div>
    <div className="push-top-small">
      {(props.members.map(member =>
        <div
          key={member.id}
          className={classNames('row', {
            'push-bottom-small': !member.isQM,
            'push-bottom-large': member.isQM,
          })}
        >
          <EditableMember
            {...member}
            readonly={props.readonly}
            onDelete={() => props.handleDelete(member.id)}
            onRoleChanged={value => props.handleRoleChanged({ roleId: value }, member.id)}
            selectRoles={props.roles}
          />
        </div>)
      )}
    </div>
    <div className="row push-top-medium">
      <div className="col-xs-4 align-right">
        <AutoSuggest
          middleware={getMembersSuggestions}
          onSuggestionSelected={props.handleAdd}
          {...props}
        />
      </div>
    </div>
    <div className="row push-top-medium">
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
  canAdd: React.PropTypes.bool,
  members: React.PropTypes.arrayOf(React.PropTypes.shape(EditableMember.propTypes)).isRequired,
  newMemberRoleId: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(React.PropTypes.shape(roleType)),
  handleDelete: React.PropTypes.func,
  handleAdd: React.PropTypes.func,
  handleValueChanged: React.PropTypes.func,
  handleSave: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
  selectedRole: React.PropTypes.string,
};

export default EditTeamPage;

