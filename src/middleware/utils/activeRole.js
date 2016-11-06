export const getActiveRole = roles => (roles ? roles.find(role => role.active) : undefined);

export const getActiveRoleShortcut = roles => (getActiveRole(roles) ? getActiveRole(roles).shortcut : '-');
export const getActiveRoleTitle = roles => (getActiveRole(roles) ? getActiveRole(roles).title : 'Unknown');

