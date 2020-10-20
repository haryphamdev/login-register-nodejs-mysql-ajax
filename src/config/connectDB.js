require("dotenv").config();
import mysql from "mysql2";

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

connection.on('error', function(err) {
    console.log(err)
    console.log("I'm dead, please setup the env file for connecting to your database! => no connection to your DB");
})

module.exports = connection;

