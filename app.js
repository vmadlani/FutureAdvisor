// Authentication
var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

// Require packages
var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var app            = express();


// Setup database
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost/yearbook';
mongoose.connect(databaseURL);

// We've put our seed data in a separate file

// Setup Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");
app.use(express.static('public'));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));
// Authentication
app.use(session({ secret: 'FUTUREADVISOR' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
require('./config/passport')(passport);

app.use(function (req, res, next) {
  console.log(req.user)
  global.user = req.user;
  next()
});

// Require routes
var routes = require('./config/routes');
app.use(routes);

// Listen on the correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening.")


// https://api.typeform.com/v0/form/UID?key=XxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX&completed=true 
// https://vmadlani.typeform.com/to/VNrOIR
// dabec34640943e74c6de31c261fbb532
// 3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f
// https://api.typeform.com/v0/form/VNrOIR?key=3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f&completed=false
