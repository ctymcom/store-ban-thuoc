const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    publicRuntimeConfig: {
        firebaseView: process.env.FIREBASE_VIEW,
    },
}