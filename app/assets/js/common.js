/******************** environement related ********************/
const developmentEnv = Object.freeze({
  env: 'dev',
  apiBase: 'http://localhost:4010/api/v1'
});

const rcEnv = Object.freeze({
  env: 'rc',
  apiBase: '/api/v1'
});

const theHostEnv = developmentEnv;


/******************** axios related ********************/
axios.defaults.baseURL = theHostEnv.apiBase;
axios.defaults.withCredentials = true;


/******************** some utils ********************/

/**
 * Get current signed-in user info.
 * If user currently is not logged in, `undefined` will be returned.
 */
function getCurUser() {
  return Cookies.getJSON('user');
}
