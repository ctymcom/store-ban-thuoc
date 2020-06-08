import base from "./base";
const db = require("./database");

export default {
  ...base,
  env: "development",
  db: db.development,
  debug: true,
};
