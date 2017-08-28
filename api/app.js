var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password'
});



var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// order api
app.post('/api/order', function (req, res) {
  connection.connect();
  
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);
    //console.log('The solution is: ', rows[0].solution);


  });
  
  connection.end();
 });

app.get('/api/order', function (req, res) {
  connection.connect();
  
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);
    //console.log('The solution is: ', rows[0].solution);


  });
  
  connection.end();
});

app.get('/api/order/:id', function (req, res) {
  connection.connect();

  var id = req.params.id;
  
  connection.query('select * from microrecord.test where id = ' + id, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);
    //console.log('The solution is: ', rows[0].solution);


  });
  
  connection.end();
  //res.send(JSON.stringify({ "a": "b" }));
});

app.put('/api/order/:id', function (req, res) {
  //req.params.id  
});

app.delete('/api/order/:id', function(req, res){

});


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

module.exports = app;
