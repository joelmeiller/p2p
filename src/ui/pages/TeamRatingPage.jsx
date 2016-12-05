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
    {(props.members.length > 0 ?
      <div>
        {(props.project.isFinal ?
          <div className="row">
            <div className="col-xs-6"></div>
            <div className="col-xs-4">
              <div className="row">
              {/* TODO: i18n */}
                <div className="col-xs-4"><p className="header">Bewertung</p></div>
                <div className="col-xs-5"><p className="header">Abweichung</p></div>
                <div className="col-xs-3"><p className="header">Note<sup>*</sup></p></div>
              </div>
            </div>
            {/* TODO: i18n */}
            <div className="col-xs-2"><p className="header">Status</p></div>
          </div> : undefined
        )}
        {(props.members.sort(sortMembers).map(member =>
          <div
            key={member.studentId}
            className={classNames('member', {
              disabled: member.removed,
            })}
          >
            <LabeledStarRatingWithGrade
              {...member}
              id={member.studentId}
              label={`${member.name}, ${member.activeRole}`}
              value={member.rating}
              readonly={member.isAccepted || props.project.isClosed}
              onChanged={value => props.handleDeviationChanged(member, value)}
              smallStars
              onSelectMember={() => props.handleSelectMember(member, props)}
            />
          </div>
        ))}
      </div> :
      <p>Noch keine Teammitglieder oder Kriterien definiert.</p>
    )}
    <div className="row">
      <div className="col-xs-12 push-top-small">
      {/* TODO: i18n */}
        <FlatButton
          label="Submit All Ratings"
          primary
          disabled={!props.canSubmit}
          labelStyle={{ fontWeight: 'bold' }}
          onClick={props.handleCloseProject}
        />
      </div>
    </div>
    <div className="row push-top-large">
    {/* TODO: i18n */}
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
  project: React.PropTypes.object,
};

TeamRatingPage.defaultProps = {
  canSubmit: false,
};

export default TeamRatingPage;
