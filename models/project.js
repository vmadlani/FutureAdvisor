var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('Project', projectSchema);