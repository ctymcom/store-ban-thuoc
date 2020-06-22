import _ from "lodash";

import { Context } from "../../context";
import { settingService } from "./setting.service";
import { ParseQueryHelper } from "../../../helpers";
import { SettingModel } from "./setting.model";
import { exampleEvent } from "../../../events";

const Query = {
  getAllSetting: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      settingService.model.tableName
    );

    let [records, total] = await Promise.all([
      settingService.findAll(queryOptions),
      settingService.count(queryOptions),
    ]);

    exampleEvent.next({settings: records as any});

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneSetting: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingService.findOne({ where: { id } });
  },
};

const Mutation = {
  createSetting: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await settingService.create(data);
  },
  updateSetting: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await settingService.updateOne(id, data);
  },
  deleteOneSetting: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingService.deleteOne(id);
  },
  deleteManySetting: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result = await settingService.deleteMany(ids);
    return result;
  },
};

const Setting = {};

export default {
  Query,
  Mutation,
  Setting,
};