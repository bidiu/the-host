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

function isGeoAvailable() {
  return "geolocation" in navigator;
};

function getCurrentPos(onSuccess, onFailure) {
  navigator.geolocation.getCurrentPosition(function(position) {
    onSuccess(position.coords);
  }, function(code) {
    onFailure(code);
    alert("To use distance filter, please allow this app to access your location :P");
  });
};

/**
 * Promise based - either resolve with the coordinate,
 * or reject with a error code.
 */
function getPosition() {
  return new Promise((resolve, reject) => {
    getCurrentPos(resolve, reject);
  });
}

function capitalizeStr(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const calcOffsetToDoc = (el) => {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
};

const calcOffsetToViewport = (el) => {
  return el.getBoundingClientRect();
}

const getDocDimension = () => {
  let height = document.documentElement.scrollHeight;
  let width = document.documentElement.scrollWidth;
  return { height, width };
};

const getViewportDimension = (scrollbar = false) => {
  if (scrollbar) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
};

const getScrollBarWidth = () => {
  let inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  let outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  let w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 === w2) w2 = outer.clientWidth;
  document.body.removeChild (outer);
  return (w1 - w2);
};

/**
 * Suppose `overflow` is not hidden.
 */
const shouldWindowVerticalScrollBarShown = () => {
  return document.documentElement.scrollHeight > window.innerHeight;
};

const hideDocScrollBars = ({ x = true, y = true } = {}) => {
  if (x) {
    document.documentElement.style.overflowX = 'hidden';
  }
  if (y) {
    document.documentElement.style.overflowY = 'hidden';
    if (shouldWindowVerticalScrollBarShown()) {
      document.documentElement.style.paddingRight = getScrollBarWidth() + 'px'
    }
  }
};

const showDocScrollBars = ({ x = true, y = true } = {}) => {
  if (x) {
    document.documentElement.style.overflowX = '';
  }
  if (y) {
    document.documentElement.style.overflowY = '';
    document.documentElement.style.paddingRight = '0';
  }
};

const getDocScrollPercentage = () => {
  let rootEl = document.documentElement;
  let viewportDimension = getViewportDimension();

  return {
    x: (rootEl.scrollLeft + viewportDimension.width) / rootEl.scrollWidth,
    y: (rootEl.scrollTop + viewportDimension.height) / rootEl.scrollHeight
  };
};


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
