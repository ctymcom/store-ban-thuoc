const moment = require('moment');

module.exports = {
    helpers: {
        migrationDate: () => {
            return moment().utc().format('YYYYMMDDHHmmss');
        }
    }
}