var mongoose = require("mongoose");

var financialALMSchema = mongoose.Schema({
	savings: Number,
	property: Number,
	investments: Number,
});

module.exports = mongoose.model('FinancialALM', financialALMSchema);



