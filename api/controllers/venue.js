const venueService = require('../services/venue');
const Res = require('../common/models/responses');
const { compressDoc } = require('../utils/common');

//res.end('retrieve venue');

/**
 * GET /api/v1/venues/:venuesId
 * 
 * Retrieve a venue.
 */
async function retrieve(req, res) {
  let venueId = req.params.venueId;

  let data = await venueService.retrieve(venueId);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

/**
 * POST /api/v1/venues
 * 
 * Create a venue.
 */
async function create(req, res) {
  let { name, type, imgUrl, about, phone, email, minCustomers, maxCustomers, zip } = req.body;
  let doc = compressDoc({ name, type, imgUrl, about, phone, email, minCustomers, maxCustomers, zip });

  let data = await venueService.create(doc);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

/**
 * PATCH /api/v1/venues/:venueId
 * 
 * Update a venue.
 */
async function update(req, res) {
  let _id = req.params.venueId;
  let { name, type, imgUrl, about, phone, email, minCustomers, maxCustomers, zip } = req.body;
  let doc = compressDoc({ _id, name, type, imgUrl, about, phone, email, minCustomers, maxCustomers, zip });

  let data = await venueService.update(doc);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
