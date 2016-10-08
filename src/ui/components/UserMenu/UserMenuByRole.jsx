/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Grade from 'material-ui/svg-icons/action/grade';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';

import UserMenu from './UserMenu.jsx';


const userMenuTM = props => ([
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/',
    disabled: props.isFinal,
  }, {
    name: 'My Ratings',
    icon: <Assessment className="menu-icon" />,
    path: '/myrating',
    disabled: !props.isFinal,
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/settings',
  }, {
    divider: true,
  }, {
    name: 'Logout',
    icon: <ExitToApp className="menu-icon" />,
  }]);

const userMenuQM = props => ([
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/',
  }, {
    divider: true,
  }, {
    name: 'Evaluation',
    icon: <Grade className="menu-icon" />,
    path: '/team/rating',
    disabled: props.isFinal,
  }, {
    name: 'My Ratings',
    icon: <Assessment className="menu-icon" />,
    path: '/myrating',
    disabled: !props.isFinal,
  }, {
    divider: true,
  }, {
    name: 'Teammembers',
    icon: <Accessibility className="menu-icon" />,
    path: '/team/edit',
  }, {
    name: 'Criteria',
    icon: <List className="menu-icon" />,
    path: '/criteria/edit',
  }, {
    name: 'Project Settings',
    icon: <Settings className="menu-icon" />,
    path: '/project/settings',
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/settings',
  }, {
    divider: true,
  }, {
    name: 'Logout',
    icon: <ExitToApp className="menu-icon" />,
  }]);

const userMenuJury = [
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/',
  }, {
    name: 'Project Settings',
    icon: <Settings className="menu-icon" />,
    path: '/project/settings',
  }, {
    divider: true,
  }, {
    name: 'Roles',
    icon: <Accessibility className="menu-icon" />,
    path: '/roles/edit',
  }, {
    name: 'Criteria',
    icon: <List className="menu-icon" />,
    path: '/categories/edit',
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/settings',
  }, {
    divider: true,
  }, {
    name: 'Logout',
    icon: <ExitToApp className="menu-icon" />,
  }];


class UserMenuByRole extends Component {
  render() {
    let menuItems = userMenuTM(this.props);

    if (this.props.isQM) {
      menuItems = userMenuQM(this.props);
    }

    if (this.props.isJury) {
      menuItems = userMenuJury;
    }

    return <UserMenu menuItems={menuItems} />;
  }
}

UserMenuByRole.propTypes = {
  isQM: React.PropTypes.bool,
  isJury: React.PropTypes.bool,
};

export default UserMenuByRole;
