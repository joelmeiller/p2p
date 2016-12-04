/* eslint-disable no-undef */
export default (endpoint) => {
  // dev & prod environment
  if (window.location.origin !== 'null') {
    const origin = window.location.origin
      .replace('localhost:3000', 'localhost:8080')
      .replace('https://www.cs.technik.fhnw.ch', 'https://server1073.cs.technik.fhnw.ch:8080');
    return `${origin}/ip-p2p/api/${endpoint}`;
  } else {
    // test environment
    return `http://localhost:8080/ip-p2p/api/${endpoint}`;
  }
};
