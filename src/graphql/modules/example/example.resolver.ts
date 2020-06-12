import _ from "lodash";

import { Context } from "../../context";
import { exampleController } from "./example.controller";
import { ParseQueryHelper, AuthHelper } from "../../../helpers";
import { ROLES } from "../../../constants";

const Query = {
  getAllExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      exampleController.model.tableName
    );

    queryOptions.raw = true;
    let [records, total] = await Promise.all([
      exampleController.findAll(queryOptions),
      exampleController.count(queryOptions),
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
    return await exampleController.findOne(queryOptions);
  },
};

const Mutation = {
  createExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await exampleController.create(data);
  },
  updateExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await exampleController.updateOne(id, data);
  },
  deleteOneExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await exampleController.deleteOne(id);
  },
  deleteManyExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await exampleController.deleteMany(ids);
    return result;
  },
};

const Example = {};

export default {
  Query,
  Mutation,
  Example,
};
