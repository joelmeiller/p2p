import React from 'react';

import MemberProgress from '../components/MemberProgress.jsx';

import sortMembers from '../utils/sortMembers.js';


const ProgressPage = props => (
  <div className="push-top-small">
    {props.members ? props.members.filter(m => !m.removed).sort(sortMembers).map(member =>
      <div key={member.email} className="row">
        <div
          className="col-xs-12"
          onClick={() => props.handleSelectMember(member, props)}
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
  members: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberProgress.propTypes)
  ),
};

export default ProgressPage;
