import _ from "lodash";

import { Context } from "../../context";
import { eventErrorService } from "./eventError.service";
import { ParseQueryHelper, AuthHelper } from "../../../helpers";
import { ROLES } from "../../../constants/role.const";
import { EventErrorModel } from "./eventError.model";

const Query = {
  getAllEventError: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    let queryOptions = ParseQueryHelper.parseGetList(args.q);

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
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await eventErrorService.findOne({ _id: id });
  },
};

const Mutation = {
  resolveEventError: async (root: any, args: any, context: Context) => {
    return await eventErrorService.resolveEventError(args);
  },
};

const EventError = {};

export default {
  Query,
  Mutation,
  EventError,
};
