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
          <div className="col-xs-6 push-bottom-medium" >
            <MemberCard
              title={member.name}
              stars={member.rating}
              text={member.comment}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

RatingPage.propTypes = {
  rating: React.PropTypes.string,
  members: React.PropTypes.array.isRequired,
};

export default RatingPage;
