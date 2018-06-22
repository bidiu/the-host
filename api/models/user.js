const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 32
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
