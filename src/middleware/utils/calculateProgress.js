// Calculate member progress
export default (member) => {
  let totalCriteria = 1;
  let setCriteria = 0;

  member.categories.forEach((cat) => {
    if (cat.criterias) {
      totalCriteria += cat.criterias ? cat.criterias.length : 0;
      cat.criterias.forEach((crit) => {
        setCriteria += crit.rating ? 1 : 0;
      });
    }
  });

  setCriteria += (member.comment && member !== '') ? 1 : 0;

  return totalCriteria > 0 ? (setCriteria / totalCriteria) * 100 : 0;
};
