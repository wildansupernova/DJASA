// insert code node js below
var express = require('express');
var app = express();     
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Djasa"
})


function insert(elmtsName,elmts,db,con){
    con.connect();
    if(err) throw err;
    elType = "(";
    for(let i = 0; i < elmtsName.length-1; ++i){
        elType += elmtsName[i] + ",";
    }
    elType += elmtsName[elmtsName.length-1] + ")";

    elVal = "(";
    for(let i = 0; i < elVal.length - 1; ++i){
        elVal += elVal[i] + ",";
    }
    elVal += elVal[elVal.length -1]  + ")";
    var squery = "Insert into " + db + elType + " values " + elVal;
    con.query(squery,function(err,result){
        if (err) throw err;
        return true;
    })
    con.end();
}

function update(elmType,elmVal,prevVal,prevType,db,con){
    con.connect();
    var squery = "Update " + db + " set " + elmType + " = " + elmVal + " WHERE " + prevType +" = " + prevVal + ";";
    con.query(squery,function(err,result){
        if(err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    })
    con.end();
}


function select(con,elmt,db,callback){ 
    con.connect();
    con.query("Select " + elmt + " From " + db  + ";", async function(err,result,fields){
        if(err) throw err; 
        return callback(result);
    });
    con.end();
}

function elementsQ(varArray){
    strRes = "";
    for(let i = 0; i < varArray.length-1; ++i){
        strRes += varArray[i] + ",";
    }
    strRes += varArray[varArray.length + 1];
}

//Set Static Public file folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());



//Use
app.use(cors())
app.use(bodyParser.json())

//////////////Route API
// app.get('/',(req,res) => {
// 	res.send('Invalid Endpoint');
// })
// start app
app.get('/', function(req, res){
    res.sendFile('index.html');
})

app.get('/user/session', function(req, res){

})

app.post('/user/login', function(req, res){
    // var res = select(con,"username,password","Account", function(res){
    console.log(req.body.username);
});

app.post('/user/signup', function(req, res){

})

app.post('/user/addservice', function(req, res){

})

app.post('/user/add')




////////////////////////



app.listen(8080);
console.log("App is listening on 8080");