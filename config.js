require("dotenv").config();

let config = {
   host: process.env.HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PW,
   database: process.env.DB_DATABASE,
   multipleStatements: true
};

module.exports = config;
