import base from "./base";
const db = require("./database");

export default {
  ...base,
  env: "testing",
  db: db.testing,
  debug: false,
};
