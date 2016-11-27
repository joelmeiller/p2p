import React from 'react';

import FinalRating from '../components/FinalRating.jsx';
import MemberCard from '../components/MemberCard.jsx';

import Header3 from '../elements/Header/Header3.jsx';

import sortMembers from '../utils/sortMembers.js';


const MemberRatingPage = props => (
  <div className="container">
    <div className="card row push-top-medium">
      <FinalRating
        text={props.title}
        value={props.rating}
      />
      <Header3
        title={
          <span>Notenabweichung:<sup>*</sup>
            <span className="push-left-small">{props.deviation}</span>
          </span>
        }
      />
    </div>
    <div className="row push-top-medium">
      {(props.ratings && props.ratings.length > 0 ?
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
        </div> :
        <p>Die Bewertung ist noch nicht abgeschlossen.</p>
      )}
    </div>
    <div className="row push-top-large">
      <p className="italic small">* Die <strong>Abweichung</strong> ist entscheidend für deine individuelle Bewertung. Sie wird mit der Teamnote verrechnet (-/+) und ergibt deine finale Einzelnote.</p>
    </div>
  </div>
);

MemberRatingPage.propTypes = {
  ratingTitle: React.PropTypes.string,
  rating: React.PropTypes.number,
  ratings: React.PropTypes.arrayOf(
    React.PropTypes.shape(MemberCard.propTypes)
  ).isRequired,
  handleSelectMember: React.PropTypes.func,
};

export default MemberRatingPage;
