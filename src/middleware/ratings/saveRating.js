// Node imports
import fetch from 'isomorphic-fetch';
import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('project/member/ratings');


export default (rating, callback) => {
  let criteriaRatings = [];
  rating.categories.forEach(cat => (
    criteriaRatings = criteriaRatings.concat(cat.criteriaRatings.map(crit => ({
      id: crit.id,
      rating: crit.rating,
      // criteria: {
      //   id: crit.criteriaId,
      //   label: crit.label,
      // },
      // category: {
      //   id: cat.id,
      //   title: cat.title,
      //   type: cat.type,
      // },
    })))
  ));

  const memberRating = {
    id: rating.ratingId,
    comment: rating.comment,
    criteriaRatings,
  };


  console.log(JSON.stringify(memberRating));

  fetch(apiEntrypoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberRating),
  })
  .then(response => response.json())
  .then(data => callback(data));
};
