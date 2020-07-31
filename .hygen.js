const moment = require("moment-timezone");

module.exports = {
  helpers: {
    migrationDate: () => {
      return moment().format("YYYYMMDDHHmmss");
    },
  },
};
