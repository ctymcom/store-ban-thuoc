import { sequelize, Sequelize, BaseModel } from "../../../base/baseModel";
import { BuildOptions, Model, Association } from "sequelize/types";
import { SettingTypeEnum } from "../../../constants";
import {
  ISettingGroup,
  SettingGroupModel,
} from "../settingGroup/settingGroup.model";

export interface ISetting extends BaseModel {
  settingGroupId?: string;
  type: SettingTypeEnum;
  key: string;
  name?: string;
  value?: any;
  isActive?: boolean;
  isPrivate?: boolean;
  readOnly?: boolean;

  // Association
  settingGroup?: ISettingGroup;
}

export type ISettingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ISetting;
};

function init() {
  const Setting = <ISettingStatic>sequelize.define(
    "tbl_setting",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      settingGroupId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_setting_group",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [Object.keys(SettingTypeEnum)],
        },
        defaultValue: SettingTypeEnum.string,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      key: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      value: {
        type: Sequelize.TEXT,
        get() {
          let type = this.getDataValue("type");
          let value = this.getDataValue("value");

          switch (type) {
            case SettingTypeEnum.array:
              return JSON.parse(value);
            case SettingTypeEnum.object:
              return JSON.parse(value);
            case SettingTypeEnum.string:
              return value;
            case SettingTypeEnum.number:
              return parseFloat(value);
            default:
              return value;
          }
        },
        set(value) {
          let type = this.getDataValue("type");

          switch (type) {
            case SettingTypeEnum.array:
              return this.setDataValue("value", JSON.stringify(value));
            case SettingTypeEnum.object:
              return this.setDataValue("value", JSON.stringify(value));
            case SettingTypeEnum.string:
            case SettingTypeEnum.number:
            default:
              return;
          }
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  Setting.belongsTo(SettingGroupModel, {
    foreignKey: "settingGroupId",
    as: "settingGroup",
  });
  SettingGroupModel.hasMany(Setting, {
    foreignKey: "settingGroupId",
    as: "settings",
  });

  return Setting;
}

const SettingModel = init();

export { SettingModel };
