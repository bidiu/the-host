const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** user schema */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 32
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  sex: {
    type: String,
    required: true,
    match: /^(m|f)$/
  },
  avatarUrl: {
    type: String,
    minlength: 1
  }
});

/** user model */
const User = mongoose.model('User', userSchema);

module.exports = User;
