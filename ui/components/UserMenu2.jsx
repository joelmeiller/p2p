import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import Assessment from 'material-ui/svg-icons/action/assessment';
import FontIcon from 'material-ui/FontIcon';
import Grade from 'material-ui/svg-icons/action/grade';
import Logout from 'material-ui/svg-icons/action/eject';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const MenuExampleIcons = () => (
  <div>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Evaluation" leftIcon={<Assessment />} />
        <MenuItem primaryText="My Rating" leftIcon={<Grade />} />
        <MenuItem primaryText="My Account" leftIcon={<Logout />} />
        <MenuItem primaryText="Logout" leftIcon={<Logout />} />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleIcons;
