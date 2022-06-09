const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  token:  String, // String is shorthand for {type: String}
});

module.exports = mongoose.model('User', userSchema);