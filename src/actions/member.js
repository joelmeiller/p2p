export const INITIALIZE = '/member/INITIALIZE';
export const SELECT_MEMBER = '/member/SELECT_MEMBER';

export const selectMember = (index) => ({
  type: SELECT_MEMBER,
  index,
});

export const initialize = (index) => ({
  type: INITIALIZE,
  initialIndex: index,
});
