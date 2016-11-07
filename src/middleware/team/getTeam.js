// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';
import mapMember from '../utils/mapMember.js';

const apiEntrypoint = getApiEntrypoint('project/members');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const members = data.map(member => ({
      ...mapMember(member),
      ratings: member.ratings(rating => ({
        ...rating,
        member: mapMember(rating.member),
      })),
    }));
    callback(members);
  });

