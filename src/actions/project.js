export const CANCEL = 'project/CANCEL';
export const SAVE = 'project/SAVE';
export const SET_PROJECT_TITLE = 'project/SET_PROJECT_TITLE';
export const SET_COACH_NAME = 'project/SET_COACH_NAME';
export const EDIT_PROJECT = 'project/EDIT';

export const cancel = props => (dispatch) => {
  dispatch({
    type: CANCEL,
  });
  props.router.push('/');
};

export const save = props => (dispatch, getStore) => {
  const updatedProject = getStore().project;
  const projectList = getStore().projectList;

  dispatch({
    type: SAVE,
    projects: projectList.projects.map(project => (project.id === updatedProject.id ? {
      ...project,
      ...updatedProject,
    } : project)),
  });
  props.router.push('/');
};

export const setProjectTitle = newValue => (dispatch) => {
  dispatch({
    type: SET_PROJECT_TITLE,
    value: newValue,
  });
};

export const setCoachName = newValue => (dispatch) => {
  dispatch({
    type: SET_COACH_NAME,
    value: newValue,
  });
};
