import _ from "lodash";

import { Context } from "../../context";
import { eventErrorService } from "./eventError.service";
import { ParseQueryHelper, AuthHelper } from "../../../helpers";
import { ROLES } from "../../../constants/role.const";
import { EventErrorModel } from "./eventError.model";

const Query = {
  getAllEventError: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return await eventErrorService.fetch(args.q);
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
