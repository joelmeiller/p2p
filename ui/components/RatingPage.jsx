import React from 'react';

import FinalRating from './FinalRating.jsx';
import MemberCard from './MemberCard.jsx';
import TabHeaderMember from './TabHeaderMember.jsx';

const RatingPage = (props) => {
  return (
    <div className="container">
      <div className="row" style={{marginBottom:30}}>
        <div className="col-xs-12">
          <TabHeaderMember
            title={props.title}
            />
        </div>
      </div>
      <div className="row" style={{marginBottom:30}}>
        <div className="col-xs-12">
          <FinalRating finalRating={props.finalRating} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-10">
          {(() => (props.ratings ? props.ratings.map((rating) =>
              <div className="col-xs-6" style={{marginBottom:30}} >
                <MemberCard
                  title={rating.title}
                  stars={rating.stars}
                  text={rating.text}
                  />
              </div>
          ) : undefined))()}
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
