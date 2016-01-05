var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var hbs = require('hbs');
var blogEngine = require(__dirname + '/blog');

var mysql = require('mysql');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('public'));
//app.use( express.bodyParser() );
//app.use( bodyParser() );
//app.set('view options', { layout: false });

//app.get('/', function(req, res){
//	res.send("This would be some HTML");
//});

app.get('/', function(req, res){
	//res.sendfile('./views/index.html');
	res.sendFile(__dirname + '/views/index.html');
	//res.render('index', {
	//	title  : "Things you own end up own you.",
	//	entries: blogEngine.getBlogEntries()
	//});
	//
	//
	//var connection = mysql.createConnection({
	//	host: 'localhost',
	//	user: 'tycc',
	//	database: 'list_of_church',
	//	password: ''
	//});

	//connection.connect();

	//connection.query('SELECT fullname, birthday FROM list;', function (err, rows, fields){
	//	if(err) throw err;
	//	console.log( rows );
	//	//console.log( fields );
	//});

	//connection.query('SELECT * FROM list WHERE id = ' + connection.escape(310), function(err, results){
	//connection.query('SELECT * FROM list WHERE id = ?', [310], function( err, results ){
	//var query = connection.query('INSERT INTO list SET ?', {
	//	id: 310,
	//	christian_name: 'isidoro',
	//	fullname: '',
	//	birthday: '1987-07-07'
	//}, function( err, results ){
	//	console.log( results );
	//});
	//console.log( query );

	//query = connection.query('SELECT * FROM list WHERE team = ?', [6], function( err, result ){
	//	console.log("SELECT * FROM list WHERE team = ?");
	//	console.log( result );
	//	//res.send( entries );
	//	//res.render('list', { entries: result}); // for .hbs
	//	//res.send('index'); // for .hbs
	//	res.sendFile(__dirname + '/views/index.html'); // for .hbs
	//	//for(var i in result){
	//	//	res.render('list', result);
	//	//	console.log(result[i])
	//	//}

	//});

	//query = connection.query('DELETE FROM list WHERE id = 310', function (err, result){
	//	if (err) throw err;
	//kk
	//	console.log('deleted ' + result.affectedRows + ' rows');
	//});

	//var sql = "SELECT * FROM ?? WHERE ?? = ?";
	//var inserts = ['users', 'id', 310];
	//sql = mysql.format(sql, inserts);
	//console.log( sql );

	//connection.end();

});

app.get('/about', function(req, res){
	//res.sendfile('./views/about.html');
	//res.sendFile(__dirname + '/views/about.html');
	//res.render('about', { title: "About Me", layout: 'layout' });
	res.render('layout', { title: "About Me" });
});

app.get('/article/:id', function(req, res){
	//res.sendfile('./views/article.html');
	//res.sendFile(__dirname + '/views/article.html');
	//res.render('article');
	var entry = blogEngine.getBlogEntry(req.params.id);
	res.render('article', { title: entry.title, blog:entry });
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

	//connection.query('SELECT fullname, birthday FROM list;', function (err, rows, fields){
	//	if(err) throw err;
	//	console.log( rows );
	//	//console.log( fields );
	//});

	//connection.query('SELECT * FROM list WHERE id = ' + connection.escape(310), function(err, results){
	//connection.query('SELECT * FROM list WHERE id = ?', [310], function( err, results ){
	//var query = connection.query('INSERT INTO list SET ?', {
	//	id: 310,
	//	christian_name: 'isidoro',
	//	fullname: '',
	//	birthday: '1987-07-07'
	//}, function( err, results ){
	//	console.log( results );
	//});
	//console.log( query );

	query = connection.query('SELECT * FROM list WHERE team = ?', [req.params.team], function( err, result ){
		console.log("SELECT * FROM list WHERE team = ?");
		console.log( result );
		//res.send( entries );
		//res.render('list', { entries: result}); // for .hbs
		//res.send('index'); // for .hbs
		//res.sendFile(__dirname + '/views/index.html'); // for .hbs
		//for(var i in result){
		//	res.render('list', result);
		//	console.log(result[i])
		//}
		res.json( result );

	});

	//query = connection.query('DELETE FROM list WHERE id = 310', function (err, result){
	//	if (err) throw err;
	//kk
	//	console.log('deleted ' + result.affectedRows + ' rows');
	//});

	//var sql = "SELECT * FROM ?? WHERE ?? = ?";
	//var inserts = ['users', 'id', 310];
	//sql = mysql.format(sql, inserts);
	//console.log( sql );

	connection.end();
});

//app.post('/insert', function( req, res ){
//app.get('/insert/:fullname', function( req, res ){
app.get('/insert/:id/:team/:fullname/:christian_name/:birthday/:telephone/:postcode/:address', function( req, res ){
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'tycc',
		database: 'list_of_church',
		password: ''
	});
	//var sql = "INSERT INTO list (id, team, fullname, christian_name) VALUE (?,?,?,?);";
	//var sql = "INSERT INTO list (id, team, fullname, christian_name) VALUE (?,?,?,?);";
	var sql = "INSERT INTO list (id, team, fullname, christian_name, birthday, telephone, postcode, address) VALUE (?,?,?,?,?,?,?,?);";
	//var inserts = ['7', '', 'isidoro'];
	//var inserts = ['707', 7, req.params.fullname, 'isidoro'];
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

	//query = connection.query('INSERT INTO list SET ?',
	query = connection.query( sql, function( err, result ){
		//res.render('list', { entries: result });
		res.json( result );
		console.log( result );
	});

	connection.end();

});

//app.get('/insert/:fullname/:christian_name', function( req, res ){
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
	//var inserts = ['7', 'John Smith', 'isidoro'];
	//var inserts = ['7', req.params.fullname, req.params.christian_name];
	var inserts = [id, team, fullname, christian_name];
	sql = mysql.format( sql, inserts );

	console.log( sql );
	connection.connect();

	//query = connection.query('INSERT INTO list SET ?',
	query = connection.query( sql, function( err, result ){
		//res.render('list', { entries: result });
		console.log( result );
	});

	connection.end();

});

app.get('/read/:id/:team/:fullname/:christian_name/:birthday/:telephone/:postcode/:address', function( req, res ){
	// req.query.id
	// req.query.fullname
	// /read?id=404&fullname=tyler+durden
	//var sql = "SELECT * FROM list WHERE;";
	var sql = "?,?,?,?,?,?,?,?";
	//var inserts = ['7', req.params.fullname, req.params.christian_name];
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
	//var user_id = req.param('id');
	//var token = req.param('token');
	//var geo = req.param('geo');

	var user_id = req.param.id;
	var token = req.param.token;
	var geo = req.param.geo;


	res.send( user_id + ' ' + token + ' ' + geo);
});


app.listen(3000);
