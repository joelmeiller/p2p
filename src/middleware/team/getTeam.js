// Node imports
import fetch from 'isomorphic-fetch';

import getApiEntrypoint from '../utils/getApiEntrypoint.js';

const apiEntrypoint = getApiEntrypoint('project/members');


export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const members = data.map(member => ({
      id: member.id.toString(),
      name: `${member.student.firstName} ${member.student.lastName}`,
      email: member.student.email,
      slug: member.student.slug,
      studentId: member.student.id.toString(),
      roles: member.roles.map(memberRole => ({
        id: memberRole.id.toString(),
        title: memberRole.role.title,
        shortcut: memberRole.role.shortcut,
        active: memberRole.active,
        roleId: memberRole.role.id.toString(),
      })),
      isQM: member.isQM,
      removed: member.removed,
    }));
    callback(members);
  });
