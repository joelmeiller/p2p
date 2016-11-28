// Node imports
import fetch from '../utils/fetch.js';
import mapRating from '../utils/mapRating.js';

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

  fetch('project/member/ratings', {
    method: 'POST',
    data: memberRating,
  })
  .then(data => callback({
    ...data,
    ratings: data.ratings.map(rating => mapRating(rating)),
  }));
};
