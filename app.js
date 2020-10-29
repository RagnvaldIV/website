var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var compression = require('compression'); 
// var helmet = require('helmet'); // Helmet seems to stop bootstrap??


var app = express();
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: [
//         "'self'", 
//         "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
//         "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
//         "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
//         "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
//       ],
//       styleSrc: [
//         "'self'", 
//         "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
//         "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
//         "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
//         "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
//       ],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//       frameSrc: ["'self'", "https://www.youtube.com/"]
//     },
//   })
// );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
