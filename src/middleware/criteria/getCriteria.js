// Node imports
import fetch from 'isomorphic-fetch';


const apiEntrypoint = 'http://localhost:8080/api/project/categories';

export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const categories = data.map(projectCategory => ({
      id: projectCategory.id.toString(),
      title: projectCategory.category.title,
      categoryId: projectCategory.category.id.toString(),
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
