/* eslint-disable no-undef */
export default (endpoint) => {
  const origin = window.location.origin
    .replace('localhost:3000', 'localhost:8080');
  return `${origin}/ip-p2p/api/${endpoint}`;
};
