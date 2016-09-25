import React from 'react';

import FinalRating from '../components/FinalRating.jsx';
import MemberCard from '../components/MemberCard.jsx';

const RatingPage = props => (
  <div className="container push-top">
    <div className="card row push-bottom-medium">
      <div className="col-xs-12">
        <FinalRating finalRating={props.rating} />
      </div>
    </div>
    <div className="row">
      <div className="col-xs-10">
        {props.members.map(member =>
          <div
            className="col-xs-6 push-bottom-medium"
            key={member.id}
          >
            <MemberCard
              title={member.name}
              stars={member.rating}
              text={member.comment}
              onReadMore={() => props.handleSelectMember(member, props)}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

RatingPage.propTypes = {
  rating: React.PropTypes.number,
  members: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      rating: React.PropTypes.number,
      comment: React.PropTypes.string,
    })
  ).isRequired,
};

export default RatingPage;
