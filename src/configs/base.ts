// import * as dotenv from "dotenv";
// dotenv.config();
import "./database";

// if (!process.env.FIREBASE) throw new Error("Chưa config firebase");
// if (!process.env.FIREBASE_VIEW) throw new Error("Chưa config firebase views");

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
};
