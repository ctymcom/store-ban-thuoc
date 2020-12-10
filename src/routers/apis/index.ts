import express from "express";
import ExampleRoute from "./example.route";
import FormRoute from "./form.route";
const router = express.Router();
router.use("/example", ExampleRoute);
router.use("/form", FormRoute);
export default router;
