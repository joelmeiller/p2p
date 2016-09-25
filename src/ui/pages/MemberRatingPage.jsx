import React from 'react';

import FinalRating from '../components/FinalRating.jsx';
import MemberCard from '../components/MemberCard.jsx';


const MemberRatingPage = props => (
  <div className="container">
    <div className="card row push-top-medium">
      <div className="col-xs-12">
        <FinalRating
          text="Your final rating is"
          value={props.rating}
        />
      </div>
    </div>
    <div className="row push-top-medium">
      <div className="col-xs-10">
        {props.members.map(member =>
          <div
            className="col-xs-6 push-bottom-medium"
            key={member.id}
          >
            <MemberCard
              onReadMore={() => props.handleSelectMember(member, props)}
              {...member}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

MemberRatingPage.propTypes = {
  rating: React.PropTypes.number,
  members: React.PropTypes.arrayOf(MemberCard.propTypes).isRequired,
};

export default MemberRatingPage;
