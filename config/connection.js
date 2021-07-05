const mysql = require("mysql");
let connection;

if (process.env.NODE_ENV === "production") {
    connection = mysql.createConnection({
        host: process.env.JAWS_HOST,
        port:process.env.JAWS_PORT,
        user:process.env.JAWS_USER,
        password:process.env.JAWS_PASS,
        database:process.env.JAWS_DATABASE
    });
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "187onacop",
        database: "burgers_db",
    })
};



connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

module.exports = connection;