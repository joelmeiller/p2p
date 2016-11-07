// Node imports
import fetch from 'isomorphic-fetch';
import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('project/members/rating');


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
