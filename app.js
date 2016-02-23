// Require packages
var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var app            = express();

// Authentication
// var passport     = require('passport');
// var flash        = require('connect-flash');
// var cookieParser = require('cookie-parser');
// var session      = require('express-session');


// Setup database
var databaseURL = 'mongodb://localhost/yearbook';
mongoose.connect(databaseURL);

// We've put our seed data in a separate file
// Require routes
var routes = require('./config/routes');

// Setup Middleware

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");
// app.use(express.static(__dirname + '/public'));

app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));
app.use(routes);

// Listen on the correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening.")


// https://api.typeform.com/v0/form/UID?key=XxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX&completed=true 
// https://vmadlani.typeform.com/to/VNrOIR
// dabec34640943e74c6de31c261fbb532
// 3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f
// https://api.typeform.com/v0/form/VNrOIR?key=3fa2fcb4f0bb33a6350bb8417485830bb0ffa09f&completed=false
