import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { configs } from "../configs";
import compression from "compression"; // compresses requests
import router from "../routers";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, swaggerTheme } from "../configs/swagger";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.set("port", configs.port);
  app.use(compression());
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "/../../public/views"));
  app.use("/public", express.static(path.join(__dirname, "../../public")));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customCss: swaggerTheme })
  );

  app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.get("/", function (req: Request, res: Response) {
    res.send("Hello World");
  });

  app.use("/", router);
};
