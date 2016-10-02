export const getActiveRole = roles => (roles ? roles.find(role => role.active) : undefined);

export const getActiveRoleType = roles => (getActiveRole(roles) ? getActiveRole(roles).id : '-');
export const getActiveRoleTitle = roles => (getActiveRole(roles) ? getActiveRole(roles).title : 'Unknown');

