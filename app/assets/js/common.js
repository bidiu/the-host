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

function mapObjToQueryStr(obj) {
  let query = '';

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      if (query) { query += '&' }
      query += (key + '=' + obj[key]);
    }
  }
  return query ? '?' + query : '';
}

function _parseSort(paramVal) {
  let entries = paramVal.split('|');
  let sort = {};

  for (let entry of entries) {
    let matches = entry.match(/^(\w+):(-?1)$/);
    if (!matches) { throw new Error('Invalid `sort` param.'); }

    sort[matches[1]] = parseInt(matches[2]);
  }
  return sort;
}

/**
 * Note that you MUST define "_id" at the end.
 * And at most 2 sort fields are supported, "_id"
 * is after the other sort field.
 */
function _encodeSort(sortObj) {
  let sort = '';

  for (let key in sortObj) {
    if (sortObj.hasOwnProperty(key) && Math.abs(sortObj[key]) === 1) {
      if (sort) { sort += '|'; }
      sort += `${key}:${sortObj[key]}`;
    }
  }
  return sort;
}


/******************** banner related ********************/
const TYPE_BANNER = 'TYPE_BANNER';
const TYPE_TOAST = 'TYPE_TOAST';

/**
 * - `icon`     Material icon text.
 * - `buttons`  A list of React Elements, typically `<span>...</span>`.
 * - `level`    0 - ignorable, 1 - normal, 2 - warning, 3 - critical
 * - `timeout`  (in ms) If you want it to show until user closes it, do not pass 
 * this (leave it undefined).
 * 
 * - `onClose`  Sometimes, user will not click any given button, but just close the
 * banner. You can use this callback to know this is the case.
 * 
 * Note that when passing `buttons`, it should be a span wrapping only
 * text, and without any style classes (notification module will take 
 * care of that), like following:
 * 
 * ```
 * <span (onClick)={myClickHandler}>More Info</span>
 * ```
 * 
 * Also note that you SHOULD provide no more than two buttons.
 */
class NotificationEntry {
  static entryCounter = 0;

  constructor({
    icon = 'info_outline', title = 'Notification', message = '', buttons = [], 
    type = TYPE_BANNER, level = 0, timeout, onClose } = {})
  {
    this.id = `${NotificationEntry.entryCounter++}`;
    this.icon = icon;
    this.title = title;
    this.message = message;
    this.buttons = buttons;
    this.type = type;
    this.level = level;
    this.timeout = timeout;
    this.onClose = onClose;
  }
}

const NotificationContext = React.createContext({
  entries: []
});
