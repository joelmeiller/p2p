// React Imports
import React from 'react';

// Material Imports
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { cyan500 } from 'material-ui/styles/colors';

import StarsRating from '../elements/StarsRating.jsx';
import TextButton from '../elements/Button/TextButton.jsx';


const MemberCard = props => (
  <Card>
    <div
      style={{
        backgroundColor: cyan500,
        margin: 0,
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      <StarsRating
        value={props.stars}
        name={`member-star-${props.title}`}
      />
    </div>
    <CardHeader
      title={props.title}
      actAsExpander
      showExpandableButton={false}
      style={{
        backgroundColor: cyan500,
        paddingTop: 0,
      }}
      titleStyle={{
        fontSize: '2.5rem',
        fontWeight: 'lighter',
      }}
      titleColor="white"
    />
    <CardText expandable={false}>
      {props.text}
    </CardText>
    <hr style={{ margin: 0 }} />
    <CardActions>
      <TextButton text="Read More" primary />
    </CardActions>
  </Card>
);

MemberCard.propTypes = {
  title: React.PropTypes.string,
  stars: React.PropTypes.number,
  text: React.PropTypes.string,
};

export default MemberCard;
