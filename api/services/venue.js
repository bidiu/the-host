const Venue = require('../models/venue');
const ApiError = require('../common/models/api-errors');
const { geocodeAddress } = require('../utils/geo');

const fields = `name type imgUrl about phone email minCustomers maxCustomers zip address lat lng`;

const venueTypes = ['restaurant', 'supermarket', 'entertainment'];
const venueTitles = ['Starbucks - The popular Cafe you love', 'Sugar Marmalade - Delicious food and deserts', 'Walmart','Oz Kafe, ByWard Market - Intimate space for dinner','Metro','KTV','Concert'];

async function index(filters, projection = fields) {
  let conditions = {};
  let { type } = filters;
  

  // type and title(name) filter
  if (type) {

    if (!venueTypes.includes(type)) {
      
      if(!venueTitles.includes(type)){

        throw new ApiError.BadReq({ details: 'Invalid venue type and title.' });
      
      }else{
        
        conditions.name = type;

      }
    }
    else if (venueTypes.includes(type))
    { conditions.type = type;}
   
  }

  // TODO geo
  

  
  // TODO tag

  return Venue.find(conditions, projection);

   //var keyword = "Starbucks - The popular Cafe you love"

   //var find = {$text:{$search:keyword}};
  // var findScore = {'score':{'$meta':'textScore'}};
  // var sort = {'score': {'$meta':'textScore'} }


   //return Venue.find({$text:{$search:keyword}}).skip(20).limit(10).exec(function(err,docs){});
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
