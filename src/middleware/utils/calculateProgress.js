// Calculate member progress
export default (member) => {
  let totalCriteria = 1;
  let setCriteria = 0;

  if (member.categories) {
    member.categories.forEach((cat) => {
      if (cat.criteriaRatings) {
        totalCriteria += cat.criteriaRatings ? cat.criteriaRatings.length : 0;
        cat.criteriaRatings.forEach((crit) => {
          setCriteria += crit.rating ? 1 : 0;
        });
      }
    });
  }

  setCriteria += (member.comment && member.comment !== '') ? 1 : 0;

  return totalCriteria > 0 ? Math.round((setCriteria / totalCriteria) * 100) : 0;
};
