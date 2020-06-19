import { sequelize, Sequelize, BaseModel } from "../../../base/baseModel";
import { BuildOptions, Model, Association } from "sequelize/types";
import { EventErrorStatusEnum, EventErrorTypeEnum } from "../../../constants";

export interface IEventError extends BaseModel {
  type?: EventErrorTypeEnum;
  errorName?: string;
  errorStack?: any;
  errorMessage?: string;
  data?: any;
  status: EventErrorStatusEnum;
}

export type IEventErrorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IEventError;
};

function init() {
  const EventError = <IEventErrorStatic>sequelize.define(
    "tbl_event_error",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      errorName: {
        type: Sequelize.STRING(1024),
      },
      errorStack: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      errorMessage: {
        type: Sequelize.TEXT,
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [Object.keys(EventErrorStatusEnum)],
        },
        defaultValue: "error",
        // error | resolved
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: { type: Sequelize.DATE },
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

  return EventError;
}

const EventErrorModel = init();

export { EventErrorModel };
