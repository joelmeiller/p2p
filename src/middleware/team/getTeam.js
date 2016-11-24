// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';
import mapMember from '../utils/mapMember.js';
import mapRating from '../utils/mapRating.js';

const apiEntrypoint = getApiEntrypoint('project/members');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const members = data.map(member => ({
      ...mapMember(member),
      rating: Math.round(member.rating * 10) / 10,
      progress: member.progress,
      // grade: member.grade,
      deviation: Math.round(member.deviation * 100) / 100,
      isFinal: member.status === 'FINAL',
      isQM: member.qm,
      ratings: member.ratings.map(rating => mapRating(rating)),
    }));
    callback(members);
  });

