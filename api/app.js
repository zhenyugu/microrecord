var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  connection.query("CREATE DATABASE IF NOT EXISTS microrecord", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  connection.query("USE microrecord");

  var createOrderTable = "CREATE TABLE IF NOT EXISTS orders (id INT NOT NULL, buyer INT NOT NULL,delivery_address INT NOT NULL,provider INT NOT NULL, status INT NOT NULL,total_price DECIMAL(2) NULL,order_time DATETIME NOT NULL,delivery_time DATETIME NULL,confirm_receive_time DATETIME NULL, PRIMARY KEY (id)); ";

  connection.query(createOrderTable, function (err, result) {
    if (err) throw err;
    console.log("orders table created");
  });
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

  var order = req.body;

  var newOrder = {
    id: req.body.id,
    buyer: req.body.buyer,
    delivery_address: req.body.delivery_address,
    provider: req.body.provider,
    status: 0,
    total_price: req.body.total_price,
    order_time: req.body.order_time,
    delivery_time: req.body.delivery_time,
    confirm_receive_time: req.body.confirm_receive_time
  }

  var userAddSql = 'INSERT INTO microrecord.orders VALUES(0,?,?,?,?,?,?,?,?)';
  var userAddSql_Params = [req.body.buyer, req.body.delivery_address, req.body.merchant, 0,
  req.body.total_price, new Date(), null, null];

  connection.query(userAddSql, userAddSql_Params, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);        
    console.log('INSERT ID:', result);
    console.log('-----------------------------------------------------------------\n\n');
  });
});

app.get('/api/order', function (req, res) {

  connection.query('select * from orders', function (err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });

});

app.get('/api/order/:id', function (req, res) {

  var id = req.params.id;

  connection.query('select * from orders where id = ' + id, function (err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });

});

app.put('/api/order/:id', function (req, res) {
  //req.params.id  
});

app.delete('/api/order/:id', function (req, res) {

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
