import _ from "lodash";

import { Context } from "../../context";
import { exampleService } from "./example.service";
import { ParseQueryHelper, AuthHelper } from "../../../helpers";
import { ROLES } from "../../../constants/role.const";

const Query = {
  getAllExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      exampleService.model.tableName
    );

    let [records, total] = await Promise.all([
      exampleService.findAll(queryOptions),
      exampleService.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    let queryOptions = ParseQueryHelper.parseGetOne(args.q);
    const { id } = args;
    queryOptions.where = { id };
    return await exampleService.findOne(queryOptions);
  },
};

const Mutation = {
  createExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await exampleService.create(data);
  },
  updateExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await exampleService.updateOne(id, data);
  },
  deleteOneExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await exampleService.deleteOne(id);
  },
  deleteManyExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await exampleService.deleteMany(ids);
    return result;
  },
};

const Example = {};

export default {
  Query,
  Mutation,
  Example,
};
