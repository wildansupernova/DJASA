var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "unit52",
    database: "tubes_basdat"
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

console.log("Hello");

db = "Account";
elmt = "*";
var res = select(con,"*","Account", function(res){
    console.log(res);
});
