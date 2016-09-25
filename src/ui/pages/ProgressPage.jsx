import React from 'react';

import MemberProgress from '../components/MemberProgress.jsx';

const ProgressPage = props => (
  <div className="container push-top-small">
    {props.members ? props.members.map(member =>
      <div key={member.id} className="row">
        <div
          className="col-xs-12"
          onClick={() => props.handleSelectMember(member, props)}
        >
          <MemberProgress
            {...member}
          />
        </div>
      </div>) : undefined
    }
  </div>
);

ProgressPage.propTypes = {
  members: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberProgress.propTypes)
  ),
};

export default ProgressPage;
