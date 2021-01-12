const dotenv = require("dotenv");
dotenv.config();
console.log('process.env.FIREBASE_VIEW', process.env.FIREBASE_VIEW);
module.exports = {
    publicRuntimeConfig: {
        firebaseView: process.env.FIREBASE_VIEW,
    },
}