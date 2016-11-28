import fetch from '../utils/fetch.js';

export default (values, callback) => {
  const members = values.map(member => ({
    id: member.id,
    student: {
      id: member.studentId,
    },
    roles: member.roles.map(memberRole => ({
      id: memberRole.id,
      active: memberRole.active,
      role: {
        id: memberRole.roleId,
        title: memberRole.title,
      },
    })),
    added: member.added && !member.removed,
    removed: member.removed && !member.added,
    updated: member.updated, // only roles can be updated
  }));

  console.log(members);

  fetch('project/members', {
    method: 'POST',
    data: members,
  })
  .then(callback);
};
