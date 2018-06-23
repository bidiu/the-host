const Venue = require('../models/venue');
const ApiError = require('../common/models/api-errors');

const fields = `venueName venueType imgUrl holder date title description information`;

async function retrieve(venueId, projection = fields) {
  let venue = await Venue.findById(venueId, projection);
  
  if (venue) { return venue; }
  throw new ApiError.NotFound();
}

async function create(doc) {
  return Venue.create(doc);
}

async function update(doc) {
  let venue = await retrieve(doc._id);

  await venue.update(doc);
  return retrieve(doc._id);
}

exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
