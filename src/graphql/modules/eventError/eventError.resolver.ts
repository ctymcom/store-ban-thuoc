import _ from "lodash";

import { Context } from "../../context";
import { eventErrorController } from "./eventError.controller";
import { ParseQueryHelper } from "../../../helpers";

const Query = {
  getAllEventError: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      eventErrorController.model.tableName
    );

    let [records, total] = await Promise.all([
      eventErrorController.findAll(queryOptions),
      eventErrorController.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneEventError: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await eventErrorController.findOne({ where: { id } });
  },
};

const Mutation = {
  resolveEventError: async (root: any, args: any, context: Context) => {
    return await eventErrorController.resolveEventError(args);
  },
  resolveMultiEventError: async(root: any, args: any, context: Context) => {
    return await eventErrorController.resolveMultiEventError(args);
  }
  // createEventError: async (root: any, args: any, context: Context) => {
  //   const { data } = args;
  //   return await eventErrorController.create(data);
  // },
  // updateEventError: async (root: any, args: any, context: Context) => {
  //   const { id, data } = args;
  //   return await eventErrorController.updateOne(id, data);
  // },
  // deleteOneEventError: async (root: any, args: any, context: Context) => {
  //   const { id } = args;
  //   return await eventErrorController.deleteOne(id);
  // },
  // deleteManyEventError: async (root: any, args: any, context: Context) => {
  //   const { ids } = args;
  //   let result = await eventErrorController.deleteMany(ids);
  //   return result;
  // },
};

const EventError = {};

export default {
  Query,
  Mutation,
  EventError,
};
