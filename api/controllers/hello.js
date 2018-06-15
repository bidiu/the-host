const helloService = require('../services/hello');

/**
 * common name:
 * 
 * retrieve, index, update, destroy, create
 * 
 * or:
 * 
 * updateImage, bookVenue
 */
const echo = function(req, res) {
  let { who } = req.params;

  res.end(helloService.sayHello(who));
};

exports.echo = echo;
