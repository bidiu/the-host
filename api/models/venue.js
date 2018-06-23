const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** venue schema */
const venueSchema = new Schema({
  venueName: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 32
  },

  venueType: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },

  imgUrl: {
    type: String,
    minlength: 1  
  },
  
  holder: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },

  date: {
    type: String,
    required: true,
    minlength: 4  
  },

  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },

  information: {
    type: String,
    minlength: 1,
    maxlength: 200
  }

  
  
});

/** venue model */
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
