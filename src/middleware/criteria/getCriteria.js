// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('project/categories');

console.log(apiEntrypoint);

export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const categories = data.map(projectCategory => ({
      id: projectCategory.id.toString(),
      title: projectCategory.category.title,
      categoryId: projectCategory.category.id.toString(),
      isSelfDefined: projectCategory.category.type === 'SELFDEFINED',
      editable: projectCategory.editable || projectCategory.category.type === 'SELFDEFINED',
      criterias: projectCategory.projectCriterias.map(projectCriteria => ({
        id: projectCriteria.id.toString(),
        label: projectCriteria.criteria.label,
        criteriaId: projectCriteria.criteria.id.toString(),
      })),
      selectCriterias: projectCategory.category.criterias.map(criteria => ({
        criteriaId: criteria.id.toString(),
        label: criteria.label,
      })),
    }));
    callback(categories);
  });
