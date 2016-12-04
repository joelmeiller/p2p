import classNames from 'classnames';

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
      // TODO: i18n
      label: 'Select Role',
      disabled: true,
    }].concat((props.selectRoles || []).map(role =>
      ({ label: role.title, id: role.roleId })
    ))
  );

  const disabled = props.readonly || props.isQM || props.removed;
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
        readonly={disabled}
      />
    </div>
  );

  return (
    <div
      className={classNames('member', {
        disabled: props.removed,
      })}
    >
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
      <div className="col-xs-1 center pull-top-small">
        {(props.removed ?
          <p className="small italic bold push-top-tiny push-left-small">Removed</p> :
          <FlatButton
            onClick={props.onDelete}
            icon={<FontIcon className="material-icons">delete</FontIcon>}
            disabled={disabled}
          />
        )}
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
  removed: React.PropTypes.bool,
  selectedRole: React.PropTypes.objectOf(
    React.PropTypes.shape(roleType)
  ),
  selectRoles: React.PropTypes.arrayOf(
    React.PropTypes.shape(roleType)
  ),
  onDelete: React.PropTypes.func,
};

export default EditableMember;
