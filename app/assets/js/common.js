/*
 * environement related
 */
const developmentEnv = Object.freeze({
  env: 'dev',
  apiBase: 'http://localhost:4010/api/v1'
});

const theHostEnv = developmentEnv;


/**
 * axios related
 */
axios.defaults.baseURL = theHostEnv.apiBase;
axios.defaults.withCredentials = true;
