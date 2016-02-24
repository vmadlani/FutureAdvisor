var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var Project = require("./project")
var FinancialALM = require("./financialALM")
var FinancialCashflow = require("./financialCashflow")
// var Project = mongoose.model("project");x

var User = mongoose.Schema({
  email: String,		  
  name: String,
  password: String,
  married: String,
  kids: String,
  lifeCover: String,
  projects: [Project.schema],
  financialALM: [FinancialALM.schema],
  financialCashflow: [FinancialCashflow.schema]
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', User);



// email: { type: String, required: true },
