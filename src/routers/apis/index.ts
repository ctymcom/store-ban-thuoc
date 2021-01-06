import express from "express";
import ExampleRoute from "./example.route";
const router = express.Router();
router.use("/example", ExampleRoute);
export default router;
