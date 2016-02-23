var mongoose = require("mongoose");

var financialALMSchema = mongoose.Schema({
  pension: String,
  savings: String,
  investment: String,
  property: String,
  debt: String,
});

module.exports = mongoose.model('FinancialALM', financialALMSchema);



