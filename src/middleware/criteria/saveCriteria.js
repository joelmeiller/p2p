// Node imports
import fetch from '../utils/fetch.js';

export default (values, callback) => {
  const categories = values.map(category => ({
    id: category.id,
    category: {
      id: category.categoryId,
      title: category.title,
    },
    projectCriterias: category.criterias.map(criteria => ({
      id: criteria.id,
      added: criteria.added && !criteria.removed,
      removed: criteria.removed && !criteria.added,
      updated: criteria.updated,
      criteria: {
        id: (category.isSelfDefined && criteria.added) ? undefined : criteria.criteriaId,
        label: criteria.label,
      },
    })),
  }));

  fetch('project/categories', {
    method: 'POST',
    data: categories,
  })
  .then(callback);
};
