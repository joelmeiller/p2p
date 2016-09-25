// React imports
import React from 'react';

// Material Imports
import FlatButton from 'material-ui/FlatButton';

import LabeledStarRatingWithGrade from '../components/LabeledStarRatingWithGrade.jsx';


const TeamRatingPage = props => (
  <div className="container">
    {(() => (props.members ? props.members.map(member =>
      <div key={member.id} className="row">
        <div className="col-xs-12">
          <LabeledStarRatingWithGrade
            {...member}
            label={`${member.name}, ${member.role}`}
            value={member.rating}
            readonly
            smallStars
          />
        </div>
      </div>
    ) : undefined))()}
    <div className="row">
      <div className="col-xs-12" style={{ marginTop: 10 }}>
        <FlatButton
          label="Submit All Ratings"
          primary
          disabled={props.canSubmit}
        />
      </div>
    </div>
  </div>
);

TeamRatingPage.propTypes = {
  members: React.PropTypes.arrayOf({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    role: React.PropTypes.string,
    rating: React.PropTypes.number,
    comment: React.PropTypes.string,
  }).isRequired,
  canSubmit: React.PropTypes.bool,
};

export default TeamRatingPage;
