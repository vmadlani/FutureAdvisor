var mongoose = require("mongoose");

var Project = require("./project")
var FinancialALM = require("./financialALM")
var FinancialCashflow = require("./financialCashflow")
// var Project = mongoose.model("project");x

var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  family: String,
  tax: String,
  projects: [Project.schema],
  financialALM: [FinancialALM.schema],
  financialCashflow: [FinancialCashflow.schema]
});

module.exports = mongoose.model('User', userSchema);