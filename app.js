var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require('fs')
var myUtil = require('./public/javascripts/util.js')
var ejs = require('ejs') //to comunicate from server to client with variables

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { EventEmitter } = require('stream');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//handler for any request
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (req.url == "/homepage"){
    console.log("caricamento homepage url --> " + req.url)
    //res.writeHead(200, {"Content-Type": "text/html"})
    res.write(fs.readFileSync(path.join(__dirname, '/public/html/index.html')))
    res.end()
  }else if(req.url.search(/zone/) != -1){
    console.log("siamo in una zona, piu' precisamente --> " + req.url.replace("/zone/", ""))
    
    var zona =  ejs.render("string", {zona: req.url.replace("/zone/", "")})
    
    let mongoClient = myUtil.mongo_connection();
    if(mongoClient == "Fallita"){
      console.log("Connessione fallita"); 
    }else{ 
      console.log("Connessione riuscita"); 
    }

    myUtil.retrieve_zone(mongoClient, zona)
    
    console.log("esco")
    res.end()
  }else {
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
