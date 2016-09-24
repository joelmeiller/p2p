// Middleware
import { updateTeamMember } from '../middleware/updateTeamMember.mock.js';

// Actions
import resetTeamMembers from './team.js';

export const INITIALIZE = '/member/INITIALIZE';
export const SELECT_MEMBER = '/member/SELECT_MEMBER';
export const UPDATE_COMMENT = '/member/UPDATE_COMMENT';
export const UPDATE_RATING = '/member/UPDATE_RATING';
export const ERROR_RESET_UPDATE = '/member/ERROR_RESET_UPDATE';


export const resetPreviousMember = value => ({
  type: ERROR_RESET_UPDATE,
  member: value,
});

const dispatchSelectMember = index => ({
  type: SELECT_MEMBER,
  index,
});

export const selectMember = (index, props) => (dispatch) => {
  if (props.memberUpdated && props.values) {
    const member = props.members[index];
    member.categories = props.values.categories;
    member.comment = props.values.comment;
    console.log(member);
    updateTeamMember(props.project, member, (err) => {
      console.log(err);
      if (err) {
        dispatch(resetPreviousMember(props.member));
        dispatch(resetTeamMembers(props.member));
      }
    });
  }
  props.router.push(`/team/${props.members[index].slug}`);
  dispatch(dispatchSelectMember(index));
};

export const updateComment = value => ({
  type: UPDATE_COMMENT,
  comment: value,
});

export const updateRating = (value, id) => ({
  type: UPDATE_RATING,
  id,
  stars: value,
});

export const initialize = index => ({
  type: INITIALIZE,
  initialIndex: index,
});
