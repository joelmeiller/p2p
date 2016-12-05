import fetch from './utils/fetch.js';

export const authImpersonate = data =>
  fetch('auth/impersonate', {
    method: 'POST',
    data,
    errorMessage: `Could not impersonate user with email ${data.impersonatedEmail}`, // TODO: i18n
  });

export const authLogin = ticket =>
  fetch('auth/login', {
    method: 'POST',
    data: {
      ticket,
    },
    errorMessage: 'Could not login', // TODO: i18n
  });

export const authLogout = () =>
  fetch('auth/logout', {
    errorMessage: 'Could not logout', // TODO: i18n
  });

export const authInfo = () =>
  fetch('auth/status', {
    errorMessage: 'Could not fetch auth info', // TODO: i18n
  });
