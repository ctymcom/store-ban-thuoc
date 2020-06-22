import _ from "lodash";

import { Context } from "../../context";
import { settingGroupService } from "./settingGroup.service";
import { ParseQueryHelper } from "../../../helpers";

const Query = {
  getAllSettingGroup: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      settingGroupService.model.tableName
    );

    let [records, total] = await Promise.all([
      settingGroupService.findAll(queryOptions),
      settingGroupService.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneSettingGroup: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingGroupService.findOne({ where: { id } });
  },
};

const Mutation = {
  createSettingGroup: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await settingGroupService.create(data);
  },
  updateSettingGroup: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await settingGroupService.updateOne(id, data);
  },
  deleteOneSettingGroup: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingGroupService.deleteOne(id);
  },
  deleteManySettingGroup: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result = await settingGroupService.deleteMany(ids);
    return result;
  },
};

const SettingGroup = {};

export default {
  Query,
  Mutation,
  SettingGroup,
};