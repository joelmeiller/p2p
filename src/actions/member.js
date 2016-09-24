export const INITIALIZE = '/member/INITIALIZE';
export const SELECT_MEMBER = '/member/SELECT_MEMBER';
export const UPDATE_COMMENT = '/member/UPDATE_COMMENT';


export const selectMember = (index) => ({
  type: SELECT_MEMBER,
  index,
});

export const updateComment = (value) => ({
  type: UPDATE_COMMENT,
  comment: value,
});

export const initialize = (index) => ({
  type: INITIALIZE,
  initialIndex: index,
});
