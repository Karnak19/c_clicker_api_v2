const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var dbconnect = mysql.createConnection({
   host: "localhost",
   user: "BazESO",
   password: "skateforfun",
   database: "c_clicker_v2",
   multipleStatements: true
});

dbconnect.connect(err => {
   if (!err) console.log("DB connection success");
   else console.log("DB connection failed" + err);
});

app.listen(3000, () => console.log("Express server started"));

//get all users
app.get("/user", (req, res) => {
   dbconnect.query("SELECT * FROM Users", (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

// Get an user
app.get("/user/:id", (req, res) => {
   dbconnect.query("SELECT * FROM Users WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

// Post an user
app.post("/user/:id", (req, res) => {
   let user = req.body;
   var sql = "INSERT INTO Users (pseudo) VALUES ?";
   dbconnect.query(sql, [user.pseudo], (err, rows, field) => {
      if (!err)
         res.forEach(e => {
            if (e.constructor == Array) {
               res.send("Inserted succesfully");
            }
         });
      else console.log(err);
   });
});

//Increment score
app.put("/user/:id/click", (req, res) => {
   dbconnect.query("UPDATE Users SET score=score+1 WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

//Delete a user
app.delete("/user/:id", (req, res) => {
   dbconnect.query("DELETE FROM Users WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
   });
});
