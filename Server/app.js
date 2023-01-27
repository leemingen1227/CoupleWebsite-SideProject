var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/imageRouter');
var postRouter = require('./routes/postRouter');
var audioRouter = require('./routes/audioRouter');
var messageRouter = require('./routes/messageRouter');

const mongoose = require('mongoose');
const { ppid } = require('process');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server!');
}, (err) => {console.log(err, 'xxxxx cant connect!!!!'); });

var app = express();

// app.all('*', (req, res, next) => {
//   if (req.secure){
//     return next();
//   }
//   else{
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/public/", express.static(path.join(__dirname, "/public/")));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/image', imageRouter); 
app.use('/blog', postRouter);
app.use('/audio', audioRouter);
app.use('/messages', messageRouter);

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
