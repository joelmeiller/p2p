// React imports
import React from 'react';

// Material Imports
import FlatButton from 'material-ui/FlatButton';

import LabeledStarRatingWithGrade from '../components/LabeledStarRatingWithGrade.jsx';


const TeamRatingPage = props => (
  <div className="container push-top-small">
    {(() => (props.members ? props.members.map(member =>
      <button
        key={member.id}
        className="row"
        onClick={() => props.handleSelectMember(member, props)}
      >
        <div className="col-xs-12">
          <LabeledStarRatingWithGrade
            {...member}
            label={`${member.name}, ${member.role}`}
            value={member.rating}
            readonly
            smallStars
          />
        </div>
      </button>
    ) : undefined))()}
    <div className="row">
      <div className="col-xs-12 push-top-mini">
        <FlatButton
          label="Submit All Ratings"
          primary
          disabled={!props.canSubmit}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </div>
    </div>
  </div>
);

TeamRatingPage.propTypes = {
  canSubmit: React.PropTypes.bool,
  members: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      deviation: React.PropTypes.number,
      deviationWarning: React.PropTypes.bool,
      grade: React.PropTypes.number,
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      rating: React.PropTypes.number,
      role: React.PropTypes.string,
      status: React.PropTypes.string,
      statusWarning: React.PropTypes.bool,
    })
  ).isRequired,
};

TeamRatingPage.defaultProps = {
  canSubmit: false,
}

export default TeamRatingPage;
