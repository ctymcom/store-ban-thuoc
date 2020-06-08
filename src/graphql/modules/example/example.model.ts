import { sequelize, Sequelize, BaseModel } from "../../../base/baseModel";
import { BuildOptions, Model, Association } from "sequelize/types";

export interface IExample extends BaseModel {
  name?: string;

  exampleId: string;

  example?: IExample;

  associations: {
    example: Association<IExample, IExample>;
  };
}

export type IExampleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IExample;
};

function init() {
  const Example = <IExampleStatic>sequelize.define(
    "tbl_example",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      exampleId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      deletedAt: { type: "TIMESTAMP" },
    },
    {
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      defaultScope: {
        attributes: { exclude: ["deletedAt"] },
      },
    }
  );

  Example.belongsTo(Example, {
    foreignKey: "exampleId",
    as: "example",
  });

  return Example;
}

const ExampleModel = init();

export { ExampleModel };
