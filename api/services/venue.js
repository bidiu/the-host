const Venue = require('../models/venue');
const ApiError = require('../common/models/api-errors');
const { geocodeAddress } = require('../utils/geo');

const fields = `name type imgUrl about phone email minCustomers maxCustomers zip address lat lng`;

const venueTypes = ['restaurant', 'supermarket', 'entertainment'];
const venueTitles = ['Starbucks - The popular Cafe you love', 'Sugar Marmalade - Delicious food and deserts', 'Walmart','Oz Kafe, ByWard Market - Intimate space for dinner','Metro','KTV','Concert'];


/**
 * Mongoose paging
 */
// async function index(projection = fields) {

//   var query = Venue.find({});
//   query.count(function(err, count){});
//   //query.skip(3).limit(3).exec();
//   console.log(query);
// }


/**
 * Index list and filter
 */
async function index(filters, projection = fields) {
  let conditions = {};
  let { type } = filters;
  
  // type and title(name) filter
  if (type) {

    if(isNaN(type)){

      if (!venueTypes.includes(type)) {
      
        if(!venueTitles.includes(type)){

          throw new ApiError.BadReq({ details: 'Invalid venue type and title.' });
      
        }else{
        
          conditions.name = type;
          var query = Venue.find(conditions, projection);
        }
      }
      else if (venueTypes.includes(type))
        { conditions.type = type;
          var query = Venue.find(conditions, projection);
        }
    
    }else if(!isNaN(type)) {

      var num = (parseInt(type)-1)*3;
      var query = Venue.find(conditions, projection).skip(num).limit(3).exec();

    }
   
  }else{

    var query = Venue.find(conditions, projection);
  }

  // TODO geo
  
  // TODO tag
  
  return query;
  
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

