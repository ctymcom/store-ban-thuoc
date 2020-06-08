import { sequelize, Sequelize } from "../loaders/sequelize";
import { Model, BuildOptions } from "sequelize/types";

export interface BaseModel extends Model {
  readonly id: string | number | any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export type IBaseStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BaseModel;
};

export { sequelize, Sequelize };
