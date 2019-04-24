require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const port = process.env.PORT || 3000;

// Config for Database connection
const config = require("./config.js");
const connection = mysql.createConnection(config);

app.use(bodyparser.json());

connection.connect(err => {
  if (!err) console.log("DB connection success");
  else console.log("DB connection failed" + err);
});

app.listen(port, () => console.log("Express server started"));

//get all users
app.get("/user", (req, res) => {
  connection.query(
    "SELECT * FROM Users ORDER BY score DESC LIMIT 10",
    (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Get an user
app.get("/user/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Users WHERE id=?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// Add an user
app.post("/user/subscribe", (req, res) => {
  let pseudo = req.body.pseudo;
  let isLogged = false;
  let insert = { id: null, pseudo: pseudo, score: 0, isLogged: isLogged };
  let sql = "INSERT INTO Users SET ?";
  connection.query(sql, [insert], (err, rows, field) => {
    if (!err) {
      res.send(rows);
      console.log(`User ${pseudo} successfully created`);
    } else console.log(err);
  });
});

//Increment user score
app.put("/user/:id/click", (req, res) => {
  connection.query(
    "UPDATE Users SET score=score+1 WHERE id=?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) {
        res.send(rows);
        console.log(`${req.params.id} click successfully`);
      } else console.log(err);
    }
  );
});

//Delete a user
app.delete("/user/:id", (req, res) => {
  connection.query(
    "DELETE FROM Users WHERE id=?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
    }
  );
});
