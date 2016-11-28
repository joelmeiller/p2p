import fetch from './utils/fetch.js';

export const authImpersonate = data =>
  fetch('auth/impersonate', {
    method: 'POST',
    data,
    errorMessage: `Could not impersonate user with email ${data.impersonatedEmail}`,
  });

export const authLogout = () =>
  fetch('auth/logout', {
    errorMessage: 'Could not logout',
  });

export const authInfo = () =>
  fetch('auth/status', {
    errorMessage: 'Could not fetch auth info',
  });
