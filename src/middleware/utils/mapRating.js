import mapMember from './mapMember.js';

const sortCategory = (x, y) => (x.category.id === y.category.id ? 0 :
  (x.category.id > y.category.id ? 1 : -1));

export default (rating) => {
  const ratings = {
    ratingId: rating.id,
    rating: rating.rating,
    comment: rating.comment,
    ...mapMember(rating.member),
    categories: [],
  };

  if (rating.criteriaRatings && rating.criteriaRatings.length > 0) {
    let prevCategory = {};
    const sortedCriteriaRatings = rating.criteriaRatings.sort(sortCategory);
    sortedCriteriaRatings.forEach(criteriaRating => {
      if (prevCategory.id === criteriaRating.category.id) {
        prevCategory.criteriaRatings.push({
          id: criteriaRating.id,
          criteriaId: criteriaRating.criteria.id,
          label: criteriaRating.criteria.label,
          rating: criteriaRating.rating,
        });
      } else {
        if (prevCategory.id) ratings.categories.push(prevCategory);
        prevCategory = {
          ...criteriaRating.category,
          criteriaRatings: [{
            id: criteriaRating.id,
            criteriaId: criteriaRating.criteria.id,
            label: criteriaRating.criteria.label,
            rating: criteriaRating.rating,
          }],
        }
      }
    });
    ratings.categories.push(prevCategory);
  }


  return ratings;
};
