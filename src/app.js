var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var hbs = require('hbs');

var mysql = require('mysql');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/views/index.html');
  res.sendFile(__dirname + '/views/form.html');
});

app.get('/about', function(req, res){
  res.render('layout', { title: "About Me" });
});

app.get('/list/:team', function(req, res){
  console.log("/list/");
  console.log( req );
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tycc',
    database: 'list_of_church',
    password: ''
  });

  connection.connect();

  query = connection.query('SELECT * FROM list WHERE team = ?', [req.params.team], function( err, result ){
    console.log("SELECT * FROM list WHERE team = ?");
    console.log( result );
    res.json( result );

  });

  connection.end();
});

app.get('/insert/:id/:team/:fullname/:christian_name/:birthday/:telephone/:postcode/:address', function( req, res ){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tycc',
    database: 'list_of_church',
    password: ''
  });
  var sql = "INSERT INTO list (id, team, fullname, christian_name, birthday, telephone, postcode, address) VALUE (?,?,?,?,?,?,?,?);";
  var inserts = [
    req.params.id,
    req.params.team,
    req.params.fullname,
    req.params.christian_name,
    req.params.birthday,
    req.params.telephone,
    req.params.postcode,
    req.params.address
  ];

  sql = mysql.format( sql, inserts );

  console.log( sql );
  connection.connect();

  query = connection.query( sql, function( err, result ){
    res.json( result );
    console.log( result );
  });

  connection.end();

});

app.get('/insert', function( req, res ){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tycc',
    database: 'list_of_church',
    password: ''
  });
  var id = 777;
  var team = 7;
  var fullname = 'John Smith';
  var christian_name = 'St.Expedite';
  var sql = "INSERT INTO list (id, team, fullname, christian_name) VALUE (?,?,?,?);";
  var inserts = [id, team, fullname, christian_name];
  sql = mysql.format( sql, inserts );

  console.log( sql );
  connection.connect();

  query = connection.query( sql, function( err, result ){
    console.log( result );
  });

  connection.end();

});

app.get('/read/:id/:team/:fullname/:christian_name/:birthday/:telephone/:postcode/:address', function( req, res ){
  var sql = "?,?,?,?,?,?,?,?";
  var params = [
    req.params.id,
    req.params.team,
    req.params.fullname,
    req.params.christian_name,
    req.params.birthday,
    req.params.telephone,
    req.params.postcode,
    req.params.address
  ];
  sql = mysql.format( sql, params);

  console.log( sql );
});

app.get('/api/users', function(req, res){
  var user_id = req.param.id;
  var token = req.param.token;
  var geo = req.param.geo;
  res.send( user_id + ' ' + token + ' ' + geo);
});

app.listen(3000);
