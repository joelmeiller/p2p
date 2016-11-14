/* eslint-disable no-undef */
export default (endpoint) => {
  const host = window.location.host.replace(':3000', ':8080');
  const url = `${window.location.protocol}//${host}/ip-p2p/api/${endpoint}`;

  return url;
};
