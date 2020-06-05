import base from "./base";
const db = require("./database");

export default {
  ...base,
  env: "production",
  db: db.development,
  debug: true,
};
