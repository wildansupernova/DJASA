// insert code node js below
var express = require('express');
var app = express();     
var path = require('path');
var bodyParser = require('body-parser');
var sql = require('mysql');
var cors = require('cors');


//Set Static Public file folder
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());



//Use
app.use(cors())
app.use(bodyParser.json())

//////////////Route API
app.get('/',(req,res) => {
	res.send('Invalid Endpoint');
})
// start app
app.get('*', function(req, res){
    res.sendFile('./public/index.html');
})

//Users
app.post('/user/register', function(req, res){

})

app.post('/user/login', function(req, res){

})

app.post('/user/logout', function(req, res){
    
})

app.get('/user/session', function(req, res){
    // response user with session true
})


app.get('/user/transaksi', function(req, res){
    
})


//Data Layanan User
app.get('/service/getservice/:id', function(req, res){
    
})

app.get('/service/addservice', function(req, res){
    
})

app.get('/service/deleteservice/:id', function(req, res){
    
})

//Data Layanan Global

app.get('/services/searchservice', function(req, res){
    
})

app.get('/services/getservices', function(req, res){

})

app.get('/services/kontrakservice', function(req, res){
    
})


////////////////////////



app.listen(8080);
console.log("App is listening on 8080");