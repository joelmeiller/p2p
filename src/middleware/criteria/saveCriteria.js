// Node imports
import fetch from 'isomorphic-fetch';

const apiEntrypoint = 'http://localhost:8080/api/project/categories';

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
      criteria: {
        id: criteria.criteriaId,
        label: criteria.label,
      },
    })),
  }));

  fetch(apiEntrypoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categories),
  })
  .then(response => response.json())
  .then(data => callback(data));
};
