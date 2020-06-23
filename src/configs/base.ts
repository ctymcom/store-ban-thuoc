import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync(path.join(__dirname, "../../.env"))) {
  console.log(".env exists");
  dotenv.config({ path: path.join(__dirname, "../../.env") });
} else if (fs.existsSync(path.join(__dirname, "../../.env.example"))) {
  console.log(".env not exists");
  dotenv.config({ path: path.join(__dirname, "../../.env.example") }); // you can delete this after you create your own .env file!
} else {
  console.log(".env.example not exists");
}

if (!process.env.FIREBASE) throw new Error("Chưa config firebase");
if (!process.env.FIREBASE_VIEW) throw new Error("Chưa config firebase views");
if (!process.env.MONGODB_URI) throw new Error("Missing Config MONGODB_URI");

export default {
  port: process.env.PORT || 3000,
  basicAuth: {
    users: { mcom: "mcom@123" },
  },
  winston: {
    db: process.env.MONGO_LOG || "",
    level: process.env.LOG_LEVEL || `silly`,
  },
  query: {
    limit: 10,
  },
  secretKey: process.env.SECRET || "HkQlTCrDfYWezqEp494TjDUqBhSzQSnn",
  timezone: "+07:00",
  domain: "http://localhost:" + process.env.PORT || 3000,
  firebase: JSON.parse(process.env.FIREBASE),
  firebaseView: process.env.FIREBASE_VIEW,
};
