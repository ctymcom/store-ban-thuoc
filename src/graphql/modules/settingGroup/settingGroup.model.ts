import { sequelize, Sequelize, BaseModel } from "../../../base/baseModel";
import { BuildOptions, Model, Association } from "sequelize/types";

export interface ISettingGroup extends BaseModel {
  slug?: string;
  name?: string;
  desc?: string;
  readOnly?: boolean;
}

export type ISettingGroupStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISettingGroup;
};

function init() {
  const SettingGroup = <ISettingGroupStatic>sequelize.define(
    "tbl_setting_group",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      readOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
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

  return SettingGroup;
}

const SettingGroupModel = init();

export { SettingGroupModel };
