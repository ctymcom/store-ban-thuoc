import _ from "lodash";

import { Context } from "../../context";
import { settingGroupController } from "./settingGroup.controller";
import { ParseQueryHelper } from "../../../helpers";

const Query = {
  getAllSettingGroup: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      settingGroupController.model.tableName
    );

    let [records, total] = await Promise.all([
      settingGroupController.findAll(queryOptions),
      settingGroupController.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneSettingGroup: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingGroupController.findOne({ where: { id } });
  },
};

const Mutation = {
  createSettingGroup: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await settingGroupController.create(data);
  },
  updateSettingGroup: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await settingGroupController.updateOne(id, data);
  },
  deleteOneSettingGroup: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingGroupController.deleteOne(id);
  },
  deleteManySettingGroup: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result = await settingGroupController.deleteMany(ids);
    return result;
  },
};

const SettingGroup = {};

export default {
  Query,
  Mutation,
  SettingGroup,
};