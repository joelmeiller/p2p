export const getActiveRole = roles => (roles ? roles.find(role => role.active) : undefined);

export const getActiveRoleType = roles => (getActiveRole(roles) ? getActiveRole(roles).type : '-');
export const getActiveRoleTitle = roles => (getActiveRole(roles) ? getActiveRole(roles).title : 'Unknown');

