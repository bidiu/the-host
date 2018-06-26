const Venue = require('../models/venue');
const ApiError = require('../common/models/api-errors');
const { geocodeAddress } = require('../utils/geo');

const fields = `name type imgUrl about phone email minCustomers maxCustomers zip address lat lng`;

async function index(projection = fields) {
  return Venue.find({}, projection);
}

async function retrieve(venueId, projection = fields) {
  let venue = await Venue.findById(venueId, projection);
  
  if (venue) { return venue; }
  throw new ApiError.NotFound();
}

async function create(doc) {
  doc = { ...doc, ...(await geocodeAddress(doc.address, doc.zip)) };
  return Venue.create(doc);
}

/**
 * TODO update geolocation (longitude and latitude).
 */
async function update(doc) {
  let venue = await retrieve(doc._id);

  await venue.update(doc);
  return retrieve(doc._id);
}

exports.index = index;
exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
