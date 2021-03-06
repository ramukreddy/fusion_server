var express = require('express');
var path = require('path');
var cors = require('cors')

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validateRequest = require('./controllers/validateRequest');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var companies = require('./routes/companies');
var concept = require('./routes/concept');
var studentcohort = require('./routes/studentcohort');
var projects = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('etag', false); 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept,X-Access-Token,X-Key");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  next();
});

app.use('/login', login);
app.use('/api/users', users);
app.use('/api/companies', companies);
app.use('/api/studentcohort', studentcohort);
app.use('/api/concepts', concept);
app.use('/api/projects', projects);
app.all('/api/',validateRequest);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.all('/*', function (req, res, next) {
//   // CORS headers
//   res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   // Set custom headers for CORS
//   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//   if (req.method == 'OPTIONS') {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });


module.exports = app;
