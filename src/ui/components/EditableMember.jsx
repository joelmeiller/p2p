import React from 'react';
import TextTruncate from 'react-text-truncate';

import { FontIcon, FlatButton } from 'material-ui';

import { default as Dropdown } from '../elements/Dropdown.jsx';

import { getActiveRole, getActiveRoleTitle } from '../../middleware/utils/activeRole.js';

const EditableMember = (props) => {
  const activeRole = getActiveRole(props.roles);

  const selectRoles = (activeRole ?
    (props.selectRoles || []).map(role =>
      ({ label: role.title, id: role.id })
    ) : [{
      id: 'XX',
      label: 'Select Role',
      disabled: true,
    }].concat((props.selectRoles || []).map(role =>
      ({ label: role.title, id: role.id })
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
        selectedValue={activeRole ? activeRole.id : 'XX'}
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
          onClick={() => props.onDelete(props.id)}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          disabled={props.readonly}
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

EditableMember.propTypes = {
  id: React.PropTypes.string,
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
