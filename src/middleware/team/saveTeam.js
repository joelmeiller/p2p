// Node imports
import fetch from 'isomorphic-fetch';

const apiEntrypoint = 'http://localhost:8080/api/project/members';

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
  }));

  console.log(members);

  fetch(apiEntrypoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(members),
  })
  .then(response => response.json())
  .then(data => callback(data));
};
