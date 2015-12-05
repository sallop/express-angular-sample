var mysql = require('mysql');
//var pool = mysql.createPool({
//	host: 'localhost',
//	user: 'tycc',
//	database: 'list_of_church',
//});

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
var query = connection.query('INSERT INTO list SET ?', {
	id: 505,
	christian_name: 'Veronica',
	fullname: '長門有希',
	birthday: '1987-10-26'
}, function( err, results ){
	console.log( results );
});

console.log( query );

query = connection.query('SELECT * FROM list WHERE team = ?', [6], function( err, result ){
	console.log("SELECT * FROM list WHERE team = ?");
	console.log( result );
});
//query = connection.query('DELETE FROM list WHERE id = 310', function (err, result){
//	if (err) throw err;
//
//	console.log('deleted ' + result.affectedRows + ' rows');
//});

//var sql = "SELECT * FROM ?? WHERE ?? = ?";
//var inserts = ['users', 'id', 310];
//sql = mysql.format(sql, inserts);
//console.log( sql );

connection.end();

//pool.getConnection(function(err, connection){
//	// use the connection
//	connection.query('SELECT * FROM list', function(err, rows){
//		connection.release();
//		console.log(rows);
//	});
//});
