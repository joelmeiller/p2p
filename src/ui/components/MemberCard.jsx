// Node imports
import classNames from 'classnames';

// React Imports
import React from 'react';

// Material Imports
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import StarsRating from '../elements/StarsRating.jsx';
import TextButton from '../elements/Button/TextButton.jsx';


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
      <div onClick={props.onReadMore}>
        <TextButton
          text="Read More"
          primary
        />
      </div>
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
