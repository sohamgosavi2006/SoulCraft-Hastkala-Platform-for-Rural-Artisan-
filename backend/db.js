const mysql = require("mysql2");

const connection = mysql.createPool({

host:"127.0.0.1",
user:"root",
password:"2255",
database:"SoulCraft_Hackathon",

waitForConnections:true,
connectionLimit:10

});

connection.getConnection((err,conn)=>{

if(err){

console.error("Database connection failed:",err);
return;

}

console.log("MySQL Connected");

conn.release();

});

module.exports = connection;