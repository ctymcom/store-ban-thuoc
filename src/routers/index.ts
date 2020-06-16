import express from "express";
import apis from "./apis";
import views from "./views";

const router = express.Router();

router.use("/api", apis);
router.use("/", views);

export default router;
