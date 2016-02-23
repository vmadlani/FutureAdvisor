var mongoose = require("mongoose");

var financialCashflowSchema = mongoose.Schema({
	job: String,
  outgoing: String,
  dividends: String,
  rental_income: String
});

module.exports = mongoose.model('FinancialCashflow', financialCashflowSchema);



