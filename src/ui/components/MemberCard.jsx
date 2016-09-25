// React Imports
import React from 'react';

// Material Imports
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import StarsRating from '../elements/StarsRating.jsx';
import TextButton from '../elements/Button/TextButton.jsx';


const MemberCard = props => (
  <Card>
    <div className="member-card-rating" >
      <StarsRating
        readonly
        value={props.stars}
        name={`member-star-${props.title}`}
      />
    </div>
    <CardHeader
      className="member-card-header"
      title={props.title}
      actAsExpander
      showExpandableButton={false}
      titleStyle={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'lighter',
      }}
    />
    <CardText expandable={false}>
      {props.text}
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
  title: React.PropTypes.string,
  stars: React.PropTypes.number,
  text: React.PropTypes.string,
  onReadMore: React.PropTypes.func,
};

export default MemberCard;
