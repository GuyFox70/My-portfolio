const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const createError = require('http-errors');
const config = require('config');
const cleanCSS = require('./public/stylesheet/cleanCSS');
const compressImage = require('./public/images/compressImage');

// cleanCSS();
// compressImage();

const app = express();
const http = require('http').createServer(app);

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

let server = http.listen(config.get('Customer.port'), () => {
  console.log('server Ok)');
});