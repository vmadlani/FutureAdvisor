var FinancialALM = require("../models/financialALM");
var User = require("../models/user");

function ALMIndex(req, res){
  console.log("ALM Index")
  FinancialALM.find({}, function(err, alm) {
    if (err) return res.status(404).send(err);
    res.status(200).send(alm);
  });
}



function ALMCreate(req, res){
  var financialALM = new FinancialALM(req.body.financialALM);
  financialALM.save(function(err){
    if (err) return res.status(500).send(err);
    var name = req.body.financialALM.user;
    User.findOne({ name: name }, function(err, user){
       user.financialALM.push(financialALM);
       user.save();
    });
    res.status(201).send(financialALM)
  });
}

// function ALMShow(req, res){
//   var id = req.params.id;

//   ALM.findById({ _id: id }, function(err, ALM) {
//     if (err) return res.status(500).send(err);
//     if (!ALM) return res.status(404).send(err);

//     res.status(200).send(ALM);
//   })
// }

function ALMUpdate(req, res){
  var id = req.params.id;

  ALM.findByIdAndUpdate({ _id: id }, req.body.ALM, function(err, ALM){
    if (err) return res.status(500).send(err);
    if (!ALM) return res.status(404).send(err);

    res.status(200).send(ALM);
  })
}

function ALMDelete(req, res){
  var id = req.params.id;

  ALM.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200)
  })
}

module.exports = {
  ALMIndex:  ALMIndex,
  ALMCreate: ALMCreate,
  // ALMShow:   ALMShow,
  ALMUpdate: ALMUpdate,
  ALMDelete: ALMDelete
}