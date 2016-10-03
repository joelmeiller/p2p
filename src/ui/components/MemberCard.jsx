// Node imports
import classNames from 'classnames';

// React Imports
import React from 'react';

// Material Imports
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton } from 'material-ui';

import StarsRating from '../elements/StarsRating.jsx';


const MemberCard = props => (
  <Card>
    <div
      className={classNames('card rating', {
        'warning-background': props.statusWarning,
      })}
    >
      <StarsRating
        readonly
        value={props.rating}
        name={props.id}
      />
    </div>
    <CardHeader
      className={classNames('card header', {
        'warning-background': props.statusWarning,
      })}
      title={props.role ? `${props.name}, ${props.role}` : props.name}
      actAsExpander
      showExpandableButton={false}
      titleStyle={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'lighter',
      }}
    />
    <CardText expandable={false}>
      {props.comment}
    </CardText>
    <hr style={{ margin: 0 }} />
    <CardActions>
      <FlatButton
        label="Read More"
        primary
        onClick={props.onReadMore}
      />
    </CardActions>
  </Card>
);

MemberCard.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  role: React.PropTypes.string,
  rating: React.PropTypes.number,
  comment: React.PropTypes.string,
  onReadMore: React.PropTypes.func,
  statusWarning: React.PropTypes.bool,
};

export default MemberCard;
