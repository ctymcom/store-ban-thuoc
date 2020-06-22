import _ from "lodash";

import { Context } from "../../context";
import { eventErrorService } from "./eventError.service";
import { ParseQueryHelper } from "../../../helpers";

const Query = {
  getAllEventError: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      eventErrorService.model.tableName
    );

    let [records, total] = await Promise.all([
      eventErrorService.findAll(queryOptions),
      eventErrorService.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOneEventError: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await eventErrorService.findOne({ where: { id } });
  },
};

const Mutation = {
  resolveEventError: async (root: any, args: any, context: Context) => {
    return await eventErrorService.resolveEventError(args);
  },
  // resolveMultiEventError: async(root: any, args: any, context: Context) => {
  //   return await eventErrorService.resolveMultiEventError(args);
  // }
  // createEventError: async (root: any, args: any, context: Context) => {
  //   const { data } = args;
  //   return await eventErrorService.create(data);
  // },
  // updateEventError: async (root: any, args: any, context: Context) => {
  //   const { id, data } = args;
  //   return await eventErrorService.updateOne(id, data);
  // },
  // deleteOneEventError: async (root: any, args: any, context: Context) => {
  //   const { id } = args;
  //   return await eventErrorService.deleteOne(id);
  // },
  // deleteManyEventError: async (root: any, args: any, context: Context) => {
  //   const { ids } = args;
  //   let result = await eventErrorService.deleteMany(ids);
  //   return result;
  // },
};

const EventError = {};

export default {
  Query,
  Mutation,
  EventError,
};
