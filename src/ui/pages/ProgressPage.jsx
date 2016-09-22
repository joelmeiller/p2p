import React from 'react';

import MemberProgress from '../components/MemberProgress.jsx';

const ProgressPage = (props) => (
  <div className="container">
    { (() => props.members ? props.members.map((member) =>
      <div key={member.id} className="row">
        <div
          className="col-xs-12"
          onClick={(e) => props.handleSelectMember(member)}
        >
          <MemberProgress
            {...member}
          />
        </div>
      </div>) : undefined)()}
  </div>
);

ProgressPage.propTypes = {
  handleSelectMember: React.PropTypes.func,
  members: React.PropTypes.array
}

export default ProgressPage;
