const env = Object.freeze({
  env: "rc",
  mongoUri: 'mongodb://the_host_mongo:27017/thehost',
  // session cookie secret
  secret: 'secret123',
  // session cookie maxage (30 days)
  maxAge: 30 * 86400 * 1000
});

module.exports = env;