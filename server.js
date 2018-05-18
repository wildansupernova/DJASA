// insert code node js below
var express = require('express');
var app = express();     
var bodyParser = require('body-parser');
var sql = require('mysql');


app.use(express.static(__dirname + '../public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

app.listen(8080);
console.log("App is listening on 8080");

const sequelize = new Sequelize('database','username','password',{
	dialect: 'mysql',
	host: "my.server.tld",
	port: 9080
});

// insert api response here

// start app
app.get('*', function(req, res){
    res.sendFile('./public/index.html');
})