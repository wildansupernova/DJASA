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
    username = "Aku";
    nama = "Pejantan Tangguh";
    password = "giaidiashd";
    address = "New York";
    email = "stark@gmail.com";
    phone_number = "0862152611";
    prof_pic = "stubpic";
    tanggal_pembuatan = "";
    var elType = ["username","nama","password","email","phone_number","prof_pic","tanggal_pembuatan"];
    var elmts = [username,nama,password,email,phone_number,prof_pic,tanggal_pembuatan];
    insert(elType,elmts,con);
})

app.post('/user/login', function(req, res){
    var res = select(con,"username,password","Account", function(res){
        console.log(res);
    });
})

app.post('/user/logout', function(req, res){
    var res = select(con,"username,password","Account", function(res){
        console.log(res);
    });
})

app.get('/user/session', function(req, res){
    var res = select(con,"username,session","Account", function(res){
        console.log(res);
    });
})


app.get('/user/transaksi', function(req, res){
    var res = select(con,"*","Transaction", function(res){
        console.log(res);
    });
})


//Data Layanan User
app.get('/service/getservice/:id', function(req, res){
    // belum dikasih parameter id
    var res = select(con,"*","Service", function(res){
        console.log(res);
    });
})

app.get('/service/addservice', function(req, res){
    nama = "Cinta Sejati";
    desc = "Loren Ipsum";
    location = "Wakanda";
    category = "Cinta";
    account_id = 1;
    var elType = ["name","description","location","category","account_id"];
    var elmts = [nama,desc,add,email,phone_number,prof_pic,tanggal_pembuatan];
    insert(elType,elmts,con);
})

app.get('/service/deleteservice/:id', function(req, res){
    
})

//Data Layanan Global

app.get('/services/searchservice', function(req, res){
    
    search_var = "AS"
    var res = select(con,search_var,"Service natural join Service_Pic natural join Service_Package", function(res){
        console.log(res);
    });
})

app.get('/services/getservices', function(req, res){

})

app.get('/services/kontrakservice', function(req, res){
    
})


////////////////////////



app.listen(8080);
console.log("App is listening on 8080");