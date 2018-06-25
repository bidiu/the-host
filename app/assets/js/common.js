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

/**
 * Example:
 *    Suppose current page's url is
 * 
 *      http://localhost:3000/html/venue.html?venueId=1
 *    then, this function will return:
 * 
 *      1 -----> always a string!!!
 * 
 * Note that the `name` param is case sentitive.
 * If you give a non-existant name, `null` will be returned.
 * 
 * @param {*} name  the query parameter name whose value you want to get
 * @param {*} url   for getting query for current page, do NOT pass this
 */
function getQueryParamVal(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
