/* eslint-disable no-undef */
export default (endpoint) => {
  const host = window.location.host.replace(':3000', ':8080');
  const url = `${window.location.protocol}//${host}/api/${endpoint}`;

  // return url;
  // TEST
  return `http://localhost:8080/api/${endpoint}`;
};
