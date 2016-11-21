// Calculate member progress
export default (rating) => {
  let totalCriteria = 1;
  let setCriteria = 0;

  if (rating.categories) {
    rating.categories.forEach((cat) => {
      if (cat.criteriaRatings) {
        totalCriteria += cat.criteriaRatings ? cat.criteriaRatings.length : 0;
        cat.criteriaRatings.forEach((crit) => {
          setCriteria += crit.rating ? 1 : 0;
        });
      }
    });
  }

  setCriteria += (rating.comment && rating.comment !== '') ? 1 : 0;

  return totalCriteria > 0 ? Math.round((setCriteria / totalCriteria) * 100) : 0;
};
