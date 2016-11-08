export default member => ({
  id: member.id.toString(),
  firstName: member.student.firstName,
  lastName: member.student.lastName,
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
});
