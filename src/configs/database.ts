const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

if (fs.existsSync(path.join(__dirname, "../../.env"))) {
  console.log(".env exists");
  dotenv.config({ path: path.join(__dirname, "../../.env") });
} else if (fs.existsSync(path.join(__dirname, "../../.env.example"))) {
  console.log(".env not exists");
  dotenv.config({ path: path.join(__dirname, "../../.env.example") }); // you can delete this after you create your own .env file!
} else {
  console.log(".env.example not exists");
}

let dbDev = process.env.PG_DEVELOPMENT.split("|");
let dbProd = process.env.PG_PRODUCTION.split("|");
let dbTesting = process.env.PG_TESTING.split("|");

module.exports = {
  development: {
    database: dbDev[0],
    host: dbDev[1],
    username: dbDev[2],
    password: dbDev[3],
    port: dbDev[4] || "5432",
    dialect: "postgresql",
  },
  production: {
    database: dbProd[0],
    host: dbProd[1],
    username: dbProd[2],
    password: dbProd[3],
    port: dbProd[4] || "5432",
    dialect: "postgresql",
  },
  testing: {
    database: dbTesting[0],
    host: dbTesting[1],
    username: dbTesting[2],
    password: dbTesting[3],
    port: dbTesting[4] || "5432",
    dialect: "postgresql",
  },
};
