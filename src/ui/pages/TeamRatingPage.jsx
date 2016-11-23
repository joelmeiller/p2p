// Node imports
import classNames from 'classnames';

// React imports
import React from 'react';

// Material Imports
import FlatButton from 'material-ui/FlatButton';

import LabeledStarRatingWithGrade from '../components/LabeledStarRatingWithGrade.jsx';

import sortMembers from '../utils/sortMembers.js';


const TeamRatingPage = props => (
  <div className="push-top-small">
    {(props.members.length > 0 ? props.members.sort(sortMembers).map(member =>
      <div
        key={member.studentId}
        className={classNames('member', {
          disabled: member.removed,
        })}
        onClick={() => (member.isFinal ? props.handleSelectMember(member) : undefined)}
      >
        <LabeledStarRatingWithGrade
          {...member}
          id={member.studentId}
          label={`${member.name}, ${member.activeRole}`}
          value={member.rating}
          readonly
          smallStars
        />
      </div>
    ) : <p>Noch keine Teammitglieder oder Kriterien definiert.</p>)}
    <div className="row">
      <div className="col-xs-12 push-top-small">
        <FlatButton
          label="Submit All Ratings"
          primary
          disabled={!props.canSubmit}
          labelStyle={{ fontWeight: 'bold' }}
        />
      </div>
    </div>
    <div className="row push-top-small">
      <p className="italic small">* Dies ist nicht die effektive Note, sondern nur ein Richtwert. Entscheidend für die individuelle Note, ist die Teamnote und die hier ersichtliche <strong>Abweichung</strong>.</p>
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
  projectGrade: React.PropTypes.number,
};

TeamRatingPage.defaultProps = {
  canSubmit: false,
};

export default TeamRatingPage;
