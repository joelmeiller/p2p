/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import Accessibility from 'material-ui/svg-icons/action/accessibility';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Grade from 'material-ui/svg-icons/action/grade';
import List from 'material-ui/svg-icons/action/list';
import Settings from 'material-ui/svg-icons/action/settings';

import UserMenu from './UserMenu.jsx';


const userMenuTM = props => ([
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/ip-p2p/',
    disabled: props.isFinal,
  }, {
    name: 'My Ratings',
    icon: <Assessment className="menu-icon" />,
    path: '/ip-p2p/myrating',
    disabled: !props.isFinal,
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/ip-p2p/settings',
  }]);

const userMenuQM = props => ([
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/ip-p2p/',
  }, {
    divider: true,
  }, {
    name: 'Evaluation',
    icon: <Grade className="menu-icon" />,
    path: '/ip-p2p/team/rating',
    disabled: props.isFinal,
  }, {
    name: 'My Ratings',
    icon: <Assessment className="menu-icon" />,
    path: '/ip-p2p/myrating',
    disabled: !props.isFinal,
  }, {
    divider: true,
  }, {
    name: 'Teammembers',
    icon: <Accessibility className="menu-icon" />,
    path: '/ip-p2p/team/edit',
  }, {
    name: 'Criteria',
    icon: <List className="menu-icon" />,
    path: '/ip-p2p/criteria/edit',
  }, {
    name: 'Project Settings',
    icon: <Settings className="menu-icon" />,
    path: '/ip-p2p/project/settings',
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/ip-p2p/settings',
  }]);

const userMenuCoach = [
  {
    name: 'Dashboard',
    icon: <Dashboard className="menu-icon" />,
    path: '/ip-p2p/',
  }, {
    name: 'Project Settings',
    icon: <Settings className="menu-icon" />,
    path: '/ip-p2p/project/settings',
  }, {
    divider: true,
  }, {
    name: 'Roles',
    icon: <Accessibility className="menu-icon" />,
    path: '/ip-p2p/roles/edit',
  }, {
    name: 'Criteria',
    icon: <List className="menu-icon" />,
    path: '/ip-p2p/categories/edit',
  }, {
    divider: true,
  }, {
    name: 'My Account',
    icon: <AccountBox className="menu-icon" />,
    path: '/ip-p2p/settings',
  }];


class UserMenuByRole extends Component {
  render() {
    let menuItems = userMenuTM(this.props);

    if (this.props.isQM) {
      menuItems = userMenuQM(this.props);
    }

    if (this.props.isCoach) {
      menuItems = userMenuCoach;
    }

    return <UserMenu menuItems={menuItems} />;
  }
}

UserMenuByRole.propTypes = {
  isQM: React.PropTypes.bool,
  isCoach: React.PropTypes.bool,
};

export default UserMenuByRole;
