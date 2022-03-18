var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var fs = require('fs')
var dbUtil = require('./public/javascripts/db');
var retrieved = false;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { EventEmitter } = require('stream');

var app = express();
    
//bodyparser init
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/zone', usersRouter) 
app.use('/', indexRouter);

dbUtil.retrieve();

//handler for any request
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (req.url == "/homepage"){
    console.log("caricamento homepage url --> " + req.url)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(fs.readFileSync(path.join(__dirname, '/public/html/index.html')))
    res.end()
  }else if(req.url == "/piste"){
    console.log("caricamento piste url --> " + req.url)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(fs.readFileSync(path.join(__dirname, '/public/html/piste.html')))
    res.end()
  }else if(req.url == "/territorio"){
    console.log("caricamento territorio url --> " + req.url)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(fs.readFileSync(path.join(__dirname, '/public/html/territorio.html')))
    res.end()
  }else if(req.url == "/info"){
    console.log("caricamento info url --> " + req.url)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(fs.readFileSync(path.join(__dirname, '/public/html/info.html')))
    res.end()
  }else{
    console.log("errore in url, url --> " + req.url)
    next(createError(404))
    res.end()
  }
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
