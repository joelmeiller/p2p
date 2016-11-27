// Node imports

import fetch from '../utils/fetch.js';
import mapMember from '../utils/mapMember.js';
import mapRating from '../utils/mapRating.js';

export default callback =>
  fetch('project/members')
  .then((data) => {
    const members = data.map(member => ({
      ...mapMember(member),
      rating: Math.round(member.rating * 10) / 10,
      progress: member.progress,
      // grade: member.grade,
      deviation: Math.round(member.deviation * 100) / 100,
      isFinal: member.status === 'FINAL',
      isAccepted: member.status === 'ACCEPTED',
      isQM: member.qm,
      ratings: member.ratings.map(rating => mapRating(rating)),
    }));
    callback(members);
  });
