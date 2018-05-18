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
    database: "djasa_database"
})

var database={
    host: "localhost",
    user: "root",
    password: "",
    database: "djasa_database"
};


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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//Use
app.use(cors())

//////////////Route API
// app.get('/',(req,res) => {
// 	res.send('Invalid Endpoint');
// })
// start app




app.get('/', function(req, res){
    res.sendFile('index.html');


})

app.get('/user/session', function(req, res){
    var cony = mysql.createConnection(database);
    cony.connect();
    var query = "SELECT * FROM ACCOUNT WHERE session_stat = TRUE";
    cony.query(query, function(err, result, fields){
        if(err) throw err;
        console.log(result[0].nama);
        res.send(result[0]);
    })
})

app.get('/user/:id', function(req, res){
    var cony = mysql.createConnection(database);
    cony.connect();
    var query = "SELECT * FROM ACCOUNT WHERE id_account = " + req.params.id;
    cony.query(query, function(err, result, fields){
        if(err) throw err;
        console.log(result[0].nama);
        res.send(result[0]);
    })
})

app.post('/user/login', function(req, res){
    // var res = select(con,"username,password","Account", function(res){
    console.log(req.body.username);
    var cony = mysql.createConnection(database);
    cony.connect();
    var username = req.body.username;
    var password = req.body.password;
    var resultQuery = [];
    var query = "SELECT * FROM account WHERE username = '" + username + "' AND password = '" + password + "';";
    cony.query(query, function(err, result, fields){
        if(err) throw err;
        if(result.length>0){
            console.log(result[0]);
            res.json(result[0]);
            var squery = "Update account set session_stat = TRUE WHERE id_account = " + result[0].id_account + ";";
            con.query(squery, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                cony.end();
            });
        } else {
            console.log("tidak ada");
            cony.end();
        }
    }) 
    
});

app.post('/user/signup', function(req, res){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    // console.log(res.body);    
    var nama = req.body.nama;
    var email = req.body.email; 
    var username = req.body.userName;
    var password = req.body.password;

    var sql = "INSERT INTO account (username, nama,password,email,tanggal_pembuatan,prof_pic,session_stat)";
    sql+= " VALUES ('" + username + "', '"+ nama + "'" +",'" + password + "','" + email+"',NULL,NULL,FALSE)";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect();
        con.end();
    });   
})

app.get('/services/getservices', function(req, res){
    var cony = mysql.createConnection(database);
    cony.connect();
    var query = "SELECT DISTINCT * FROM SERVICE JOIN ACCOUNT ON account.id_account = service.account_id;";
    cony.query(query, function(err, result, fields){
        if(err) throw err;
        console.log(result);
        res.json(result);
    })
})


app.post('/services/addservices',function(req,res){
    console.log("tes");
    var cony = mysql.createConnection(database);
    cony.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    var sql = "INSERT INTO service (name, description,category,account_id,price,image) ";
    sql+= " VALUES ( '"+ req.body.namaJasa +"' , '"+ req.body.description +"' , '"+req.body.category+"' , "+ req.body.account_id+" , '"+req.body.price+"', '"+ req.body.base64 +"' )";

    cony.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        cony.end();
        res.json({msg:"Success"});
    });      
})

app.post("/user/logout", function(req, res){
    var squery = "Update account set session_stat = FALSE WHERE id_account = " + req.body.id_account + ";";
    var cony = mysql.createConnection(database);
    cony.query(squery, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        cony.end();
        res.json({msg  :"done"});
    });
})


app.post('/user/add')




////////////////////////



app.listen(8080);
console.log("App is listening on 8080");