// Node imports
import fetch from 'isomorphic-fetch';
import getApiEntrypoint from '../utils/getApiEntrypoint.js';
import mapRating from '../utils/mapRating.js';

const apiEntrypoint = getApiEntrypoint('project/member/ratings');


export default (rating, callback) => {
  let criteriaRatings = [];
  rating.categories.forEach(cat => (
    criteriaRatings = criteriaRatings.concat(cat.criteriaRatings.map(crit => ({
      id: crit.id,
      rating: crit.rating,
    })))
  ));

  const memberRating = {
    id: rating.ratingId,
    comment: rating.comment,
    criteriaRatings,
  };

  fetch(apiEntrypoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberRating),
  })
  .then(response => response.json())
  .then(data => callback({
    ...data,
    ratings: data.ratings.map(rating => mapRating(rating)),
  }));
};
