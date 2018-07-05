const venueService = require('../services/venue');
const Res = require('../common/models/responses');
const ApiError = require('../common/models/api-errors');
const { compressDoc } = require('../utils/common');

// parse sort query param
function _parseSort(paramVal) {
  let entries = paramVal.split('|');
  let sort = {};

  for (let entry of entries) {
    let matches = entry.match(/^(\w+):(-?1)$/);
    if (!matches) { throw new ApiError.BadReq({ details: 'Invalid `sort` param.' }); }

    sort[matches[1]] = parseInt(matches[2]);
  }
  return sort;
}

/**
 * GET /api/v1/venues
 * 
 * Index venues.
 */
async function index(req, res) {
  let { type, name, sort, limit } = req.query;
  let filters = { type, name };

  if (sort) { sort = _parseSort(sort); }
  if (limit) { limit = parseInt(limit); }

  let data = await venueService.index(filters, { sort, limit });
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

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
  let {
    name, type, imgUrl, about, phone, email, 
    minCustomers, maxCustomers, zip, address
  } = req.body;

  let doc = compressDoc({
    name, type, imgUrl, about, phone, email, 
    minCustomers, maxCustomers, zip, address
  });

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
  let {
    name, type, imgUrl, about, phone, email, 
    minCustomers, maxCustomers, zip, address 
  } = req.body;

  let doc = compressDoc({
    _id, name, type, imgUrl, about, phone, email,
    minCustomers, maxCustomers, zip, address
  });

  let data = await venueService.update(doc);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

exports.index = index;
exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
