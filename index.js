require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

// Config for Database connection
const config = require("./config.js");
const connection = mysql.createConnection(config);

app.use(bodyparser.json());

connection.connect(err => {
   if (!err) console.log("DB connection success");
   else console.log("DB connection failed" + err);
});

app.listen(process.env.PORT, () => console.log("Express server started"));

//get all users
app.get("/user", (req, res) => {
   connection.query("SELECT * FROM Users", (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

// Get an user
app.get("/user/:id", (req, res) => {
   connection.query("SELECT * FROM Users WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

// TODO: Add an user
app.post("/user/subscribe", (req, res) => {
   let pseudo = req.body.pseudo;
   let insert = { id: null, pseudo: pseudo, score: 0, isLogged: 0 };
   let isLogged = false;
   let sql = "INSERT INTO Users SET ?";
   connection.query(sql, [insert], (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err, pseudo);
   });
});

//Increment user score
app.put("/user/:id/click", (req, res) => {
   connection.query("UPDATE Users SET score=score+1 WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
   });
});

//Delete a user
app.delete("/user/:id", (req, res) => {
   connection.query("DELETE FROM Users WHERE id=?", [req.params.id], (err, rows, field) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
   });
});
