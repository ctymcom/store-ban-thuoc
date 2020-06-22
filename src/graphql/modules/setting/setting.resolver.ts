import _ from "lodash";

import { Context } from "../../context";
import { settingController } from "./setting.controller";
import { ParseQueryHelper } from "../../../helpers";
import { SettingModel } from "./setting.model";
import { exampleEvent } from "../../../events";

const Query = {
  getAllSetting: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      settingController.model.tableName
    );

    let [records, total] = await Promise.all([
      settingController.findAll(queryOptions),
      settingController.count(queryOptions),
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
    return await settingController.findOne({ where: { id } });
  },
};

const Mutation = {
  createSetting: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await settingController.create(data);
  },
  updateSetting: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await settingController.updateOne(id, data);
  },
  deleteOneSetting: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await settingController.deleteOne(id);
  },
  deleteManySetting: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result = await settingController.deleteMany(ids);
    return result;
  },
};

const Setting = {};

export default {
  Query,
  Mutation,
  Setting,
};