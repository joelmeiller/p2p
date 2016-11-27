import mapMember from './mapMember.js';

const sortCategory = (x, y) => (x.category.id === y.category.id ? 0 :
  (x.category.id > y.category.id ? 1 : -1));

const mapCriteriaRating = (criteriaRating) => ({
  id: criteriaRating.id.toString(),
  criteriaId: criteriaRating.criteria.id.toString(),
  label: criteriaRating.criteria.label,
  rating: criteriaRating.rating,
});

export default (rating) => {
  const ratings = {
    ratingId: rating.id.toString(),
    rating: Math.round(rating.rating * 10) / 10,
    comment: rating.comment,
    canFinalize: rating.canFinalize,
    isFinal: rating.isFinal,
    ...mapMember(rating.member),
    categories: [],
  };

  if (rating.criteriaRatings && rating.criteriaRatings.length > 0) {
    let prevCategory = {};
    const sortedCriteriaRatings = rating.criteriaRatings.sort(sortCategory);
    sortedCriteriaRatings.forEach(criteriaRating => {
      if (prevCategory.id === criteriaRating.category.id) {
        prevCategory.criteriaRatings.push(mapCriteriaRating(criteriaRating));
      } else {
        if (prevCategory.id) ratings.categories.push(prevCategory);
        prevCategory = {
          ...criteriaRating.category,
          criteriaRatings: [mapCriteriaRating(criteriaRating)],
        }
      }
    });
    ratings.categories.push(prevCategory);
  }


  return ratings;
};
