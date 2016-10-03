// Node imports
import classNames from 'classnames';
import moment from 'moment';

// React imports
import React from 'react';

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const ActionItem = props => (
  <Card className="col-xs-12 push-top-mini">
    <CardHeader
      title={<span className={classNames('uppercase', props.status)}>{props.type}</span>}
      subtitle={moment(props.date).format('L')}
      style={{ width: '25%', float: 'left' }}
    />
    <CardText
      style={{ width: '50%', float: 'left' }}
    >{props.message}</CardText>
    <CardActions style={{ float: 'right', paddingTop: '15px' }}>
      <RaisedButton
        label={props.actionText}
        primary
        onClick={() => props.onPerformAction(props)}
      />
    </CardActions>
  </Card>
);

ActionItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  actionText: React.PropTypes.string,
  date: React.PropTypes.string,
  status: React.PropTypes.string,
  message: React.PropTypes.string,
  onPerformAction: React.PropTypes.func,
};

export default ActionItem;
