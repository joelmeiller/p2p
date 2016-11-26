// Node imports

import fetch from '../utils/fetch.js';
import mapMember from '../utils/mapMember.js';
import mapRating from '../utils/mapRating.js';

export default callback =>
  fetch('project/members')
  .then((data) => {
    const members = data.map(member => ({
      ...mapMember(member),
      isFinal: member.status === 'FINAL',
      isQM: member.qm,
      ratings: member.ratings.map(rating => mapRating(rating)),
    }));
    callback(members);
  });
