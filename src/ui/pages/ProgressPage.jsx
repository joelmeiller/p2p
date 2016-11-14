import React from 'react';

import MemberProgress from '../components/MemberProgress.jsx';

import sortMembers from '../utils/sortMembers.js';


const ProgressPage = props => (
  <div className="push-top-small">
    {props.ratings ? props.ratings.filter(m => !m.removed).sort(sortMembers).map(member =>
      <div key={member.email} className="row">
        <div
          className="col-xs-12"
          onClick={() => props.handleSelectRating(member)}
        >
          <MemberProgress
            {...member}
            progress={props.isFinal ? 100 : member.progress}
          />
        </div>
      </div>) : undefined
    }
  </div>
);

ProgressPage.propTypes = {
  isFinal: React.PropTypes.bool,
  ratings: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberProgress.propTypes)
  ),
};

export default ProgressPage;
