import fetch from '../utils/fetch.js';

export default callback =>
  fetch('user/settings')
  .then(data => callback({
    user: {
      id: data.user.id.toString(),
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      fullName: `${data.user.firstName} ${data.user.lastName}`,
      role: data.role ? data.role.shortcut : '-',
      isQM: data.user.qm,
      isCoach: data.user.coach,
      isJury: data.user.coach,
      isApproved: data.user.status === 'ACCEPTED',
    },
    project: data.project ? {
      ...data.project,
      isFinal: !['NEW', 'OPEN'].includes(data.project.status),
    } : {},
  }));
