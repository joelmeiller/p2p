export default (members) => {
  const ratings = [];

  if (members.length > 0) {
    members.forEach((member) => {
      let total = 0;
      let count = 0;
      const categories = [];

      if (member.ratings.length > 0) {
        member.ratings[0].categories.forEach((category) => {
          const criteriaRatings = [];

          category.criteriaRatings.forEach((criteria) => {
            let critTotal = 0;
            let critCount = 0;

            members.forEach((m) => {
              const mCrit = m.ratings
              .find(rat => rat.studentId === member.studentId).categories
              .find(cat => cat.id === category.id).criteriaRatings
              .find(crit => crit.criteriaId === criteria.criteriaId);

              if (mCrit) {
                critTotal += mCrit.rating;
                critCount += 1;
                total += mCrit.rating;
                count += 1;
              }
            });

            criteriaRatings.push({
              criteriaId: criteria.criteriaId,
              label: criteria.label,
              rating: critTotal / critCount,
            });
          });

          categories.push({
            ...category,
            criteriaRatings,
          });
        });
      }

      ratings.push({
        ...member,
        categories,
        rating: total / count,
      });
    });
  }

  return ratings;
};
