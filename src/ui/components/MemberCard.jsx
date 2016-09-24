// React Imports
import React from 'react';

// Material Imports
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {cyan500} from 'material-ui/styles/colors';

import StarsRating from '../elements/StarsRating.jsx';
import TextButton from '../elements/Button/TextButton.jsx';

const MemberCard = (props) => {
  return (
    <Card>
      <div style={{
          backgroundColor: cyan500,
          margin: 0,
          paddingLeft: 10,
          paddingTop: 10
        }}>
        <StarsRating
          value={props.stars}
          name={'member-star-' + props.title}
          />
      </div>
      <CardHeader
        title={props.title}
        actAsExpander={true}
        showExpandableButton={false}
        style={{
          backgroundColor: cyan500,
          paddingTop: 0
        }}
        titleStyle={{
          fontSize: '2.5rem',
          fontWeight: 'lighter'
        }}
        titleColor="white"
        />
      <CardText expandable={false}>
        {props.text}
      </CardText>
      <hr style={{margin: 0}} />
      <CardActions>
        <TextButton text="Read More" primary={true} />
      </CardActions>
    </Card>
  );
};

export default MemberCard;
