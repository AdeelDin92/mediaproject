const mongoose = require('mongoose');
const { Schema } = mongoose;

const QSchema = new Schema({
  Q1:  String,
  Q2: String,
  Q3: String // String is shorthand for {type: String}
});

module.exports = mongoose.model('Questions', QSchema);