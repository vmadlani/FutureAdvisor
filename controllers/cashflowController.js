var Cashflow = require("../models/financialCashflow");
var User = require("../models/user");

function cashflowIndex(req, res){
  console.log("cashflowIndex function"); 
  res.render('formsA'); 
}

  // response.render('signup.ejs', { message: request.flash('signupMessage') }) 

  // Project.find({}, function(err, projects) {
  //   if (err) return res.status(404).send(err);

  //   res.status(200).send(projects);
  // });


module.exports = {
  cashflowIndex:  cashflowIndex
}