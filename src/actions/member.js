// Middleware
import { updateTeamMember as apiUpdateTeamMember } from '../middleware/updateTeamMember.mock.js';
import calculateProgress from '../middleware/utils/calculateProgress.js';

// Actions
import { setTitle } from './app.js';
import { updateTeamMember, resetTeamMembers } from './team.js';

export const INITIALIZE = '/member/INITIALIZE';
export const SELECT_MEMBER = '/member/SELECT_MEMBER';
export const UPDATE_COMMENT = '/member/UPDATE_COMMENT';
export const UPDATE_RATING = '/member/UPDATE_RATING';
export const ERROR_RESET_UPDATE = '/member/ERROR_RESET_UPDATE';


export const resetPreviousMember = value => ({
  type: ERROR_RESET_UPDATE,
  member: value,
});

const showSelectedMember = (index, props) => ({
  type: SELECT_MEMBER,
  members: props.members,
  onClosePath: props.onClosePath,
  index,
  readonly: props.readonly || props.isQM,
  title: props.title,
  testParam: props.testParam,
});

const saveMember = props => (dispatch) => {
  if (props.memberUpdated && props.values) {
    const member = props.members[props.selectedIndex];

    if (props.values.ratings) {
      member.categories = member.categories.map(category => ({
        ...category,
        criterias: (category.criterias ? category.criterias.map(criteria => ({
          ...criteria,
          rating: (props.values.ratings.find(r => r.id === criteria.id) ?
            props.values.ratings.find(r => r.id === criteria.id).stars : criteria.rating),
        })) : undefined),
      })
      );
    }
    member.categories = props.values.categories;
    member.comment = props.values.comment || member.comment;
    member.progress = calculateProgress(member);
    console.log(member);

    dispatch(updateTeamMember(member));

    apiUpdateTeamMember(member, (err, res) => {
      console.log(err, res);
      if (err) {
        dispatch(resetPreviousMember(props.member));
        dispatch(resetTeamMembers(props.member));
      }
    });
  }
};

export const selectMember = (index, props) => (dispatch) => {
  dispatch(saveMember(props));
  dispatch(setTitle(`${props.title} ${props.members[index].name}`));
  dispatch(showSelectedMember(index, props));
};

export const showMember = (member, props) => (dispatch) => {
  const index = props.members ? props.members.indexOf(member) : -1;
  if (index > -1) {
    dispatch(selectMember(index, props));
    props.router.push(`/team/rating/${props.members[index].slug}`);
  } else {
    console.log('Member not found');
  }
};

export const saveMemberAndClose = props => (dispatch) => {
  dispatch(saveMember(props.selectedIndex, props));
  props.router.push(props.onClosePath || `/${props.testParam}`);
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
