// Node imports
import fetch from 'isomorphic-fetch';


const apiEntrypoint = 'http://localhost:8080/api/project/members';

export default callback =>
  fetch(apiEntrypoint)
  .then(response => response.json())
  .then((data) => {
    const members = data.map(member => ({
      id: member.id.toString(),
      name: `${member.student.firstName} ${member.student.lastName}`,
      slug: member.student.slug,
      studentId: member.student.id.toString(),
      roles: member.roles.map(memberRole => ({
        id: memberRole.id.toString(),
        title: memberRole.role.title,
        active: memberRole.active,
        roleId: memberRole.role.id.toString(),
      })),
    }));
    callback(members);
  });
