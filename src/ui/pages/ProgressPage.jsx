import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

import MemberProgress from '../components/MemberProgress.jsx';

import sortMembers from '../utils/sortMembers.js';


const ProgressPage = props => (
  <div className="push-top-small">
    {props.ratings ? props.ratings.filter(m => !m.removed).sort(sortMembers).map(member =>
      <div
        key={member.email}
        className="row"
        onClick={() => props.handleSelectRating(member)}
      >
        <div className="col-xs-8">
          <MemberProgress
            {...member}
            progress={member.progress}
          />
        </div>
        <div className="col-xs-4 star small">
          {(member.rating ?
            <StarRatingComponent
              starCount={5}
              value={member.rating}
              name={member.id}
            /> : undefined
          )}
        </div>
      </div>) : undefined
    }
  </div>
);

ProgressPage.propTypes = {
  ratings: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberProgress.propTypes)
  ),
};

export default ProgressPage;
