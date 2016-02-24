var User = require("../models/user");
var passport = require("passport")

// GET /signup
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response) {
  console.log(request.params)

  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/', 
    failureRedirect : '/signup', 
    failureFlash : true 
  });

  return signUpStrategy(request, response) 
}

// GET /login
function getLogin(request, response) { 
  response.render('login.ejs', { message: request.flash('loginMessage') }); 
}

// POST /login 
function postLogin(request, response) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/', 
    failureRedirect : '/login', 
    failureFlash : true 
  });

  return loginProperty(request, response);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}



// ORIGINAL FUNCTIONS
function usersIndex(req, res){
  User.find({}, function(err, users) {
    if (err) return res.status(404).send(err);

    res.status(200).send(users);
  });
}

function usersCreate(req, res){
  var user = new User(req.body.user);

  user.save(function(err, user) {
    if (err) return res.status(500).send(err);

    res.status(201).send(user)
  })
}

function usersShow(req, res){
  var id = req.params.id;

  User.findById({ _id: id }).populate("projects").exec(function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);

    res.status(200).send(user);
  })
}

function usersUpdate(req, res) {
  var id = req.params.id;

  User.findByIdAndUpdate({ _id: id }, req.body.user, {new: true}, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  })
}

function usersDelete(req, res){
  var id = req.params.id;

  User.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send()
  })
}

module.exports = {
  usersIndex:  usersIndex,
  usersCreate: usersCreate,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete,
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  // getLogout: getLogout,
}