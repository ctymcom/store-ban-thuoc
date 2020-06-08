import Sequelize from "sequelize";
import { configs } from "../configs";
// import { Logger } from "./logger";

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

let logging: any = false;

// if (configs.env != "testing") {
//   logging = (sql: string, timing?: number) => {
//     if (configs.env != "testing") Logger.info(sql);
//   };
// }

const sequelize = new Sequelize.Sequelize(
  configs.db.database,
  configs.db.username,
  configs.db.password,
  {
    operatorsAliases,
    host: configs.db.host,
    port: configs.db.port,
    dialect: "postgres",
    logging: logging,
  }
);

export { Sequelize, sequelize };
