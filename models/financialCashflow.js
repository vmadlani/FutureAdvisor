var mongoose = require("mongoose");

var financialCashflowSchema = mongoose.Schema({	
  	income: String,
  	outgoings: String,
  	pension: String
});

module.exports = mongoose.model('FinancialCashflow', financialCashflowSchema);



