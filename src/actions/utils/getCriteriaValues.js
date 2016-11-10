export default (member, values) => (
  member.categories.map(category => (
    Object.assign({},
    category,
    { criteriaRatings: category.criteriaRatings.map((criteria) => {
      const newRating = values.ratings.find(r => r.id === criteria.id);
      const rating = newRating ? Object.assign({}, newRating, {
        label: criteria.label,
        criteriaId: criteria.criteriaId,
      }) : criteria;
      return rating;
    }) }
  )))
);

