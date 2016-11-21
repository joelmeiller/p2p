import React from 'react';

import FinalRating from '../components/FinalRating.jsx';
import MemberCard from '../components/MemberCard.jsx';

import sortMembers from '../utils/sortMembers.js';


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
        {props.ratings.filter(m => !m.removed).sort(sortMembers).map(member =>
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
  ratings: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberCard.propTypes)
  ).isRequired,
  handleSelectMember: React.PropTypes.func,
};

export default MemberRatingPage;
