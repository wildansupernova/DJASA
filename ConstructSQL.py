import json
import os
import string
import time
import random
import pymysql.cursors


sql_syntax = ["(", ")", "select", "from","where","as","join", "create"]
sql_join = ["natural", "inner", "outer", "left", "right"]
sql_conditions = ["=", ">", "<", ">=", "=<", "like"]
sql_create = ["view", "table","database"]

def initiateSQL() :
    connection = pymysql.connect(host='localhost',user = 'root',password = 'unit52', db = 'Dictionary')
    return(connection)

def getSQLResult(sq,connection, All = False):
    with connection.cursor() as cursor :
        cursor.execute(sq)
        if(not All):
            result = cursor.fetchone()
        else :
            result = cursor.fetchall()
    connection.commit()
    return(result)

def constructSelect(table, col = "*", cond = "\0", groupby = "\0", orderby = "\0", order = True, nested = False):
    sq ="select " + col + " from " + table
    if(cond != "\0") :
        sq += " where " + cond
    if(groupby != "\0") :
        sq += " group by " + groupby
    if(orderby != "\0") :
        sq += " order by " + orderby
        if(order) :
            sq += " asc"
    sq += ";"
    return(sq)

sq = initiateSQL();

selectStr = constructSelect("account", col = "name count()", groupby="id")
print(selectStr)