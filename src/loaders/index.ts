import expressLoader from "./express";
import { Logger } from "./logger";

export default ({ expressApp }: any) => {
  expressLoader({ app: expressApp });
  Logger.info("Load Source Successfully!");
};
