import React from 'react';
import TextTruncate from 'react-text-truncate';

import { FontIcon, FlatButton } from 'material-ui';

import { default as Dropdown } from '../elements/Dropdown.jsx';

import { getActiveRole, getActiveRoleTitle } from '../../middleware/utils/activeRole.js';

const EditableMember = (props) => {
  const activeRole = getActiveRole(props.roles);

  const selectRoles = (activeRole ?
    (props.selectRoles || []).map(role =>
      ({ label: role.title, id: role.roleId })
    ) : [{
      id: 'XX',
      label: 'Select Role',
      disabled: true,
    }].concat((props.selectRoles || []).map(role =>
      ({ label: role.title, id: role.roleId })
    ))
  );

  const dropdown = (props.isQM ?
    <div className="col-xs-3">
      <TextTruncate
        line={1}
        truncateText={'...'}
        text={getActiveRoleTitle(props.roles)}
      />
    </div> :
    <div className="col-xs-3 pull-top-small">
      <Dropdown
        items={selectRoles}
        onChange={props.onRoleChanged}
        selectedValue={activeRole ? activeRole.roleId : 'XX'}
        readonly={props.readonly || props.isQM}
      />
    </div>
  );

  return (
    <div>
      <div className="col-xs-3">
        <TextTruncate
          line={1}
          truncateText={'...'}
          text={props.name}
        />
      </div>
      <div className="col-xs-4">
        <TextTruncate
          line={1}
          truncateText={'...'}
          text={props.email}
        />
      </div>
      {dropdown}
      <div className="col-xs-1 pull-top-small">
        <FlatButton
          onClick={props.onDelete}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          disabled={props.readonly}
        />
      </div>
    </div>
  );
};

export const roleType = {
  roleId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};

EditableMember.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  isQM: React.PropTypes.bool,
  onRoleChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  selectedRole: React.PropTypes.objectOf(
    React.PropTypes.shape(roleType)
  ),
  selectRoles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  onDelete: React.PropTypes.func,
};

export default EditableMember;
