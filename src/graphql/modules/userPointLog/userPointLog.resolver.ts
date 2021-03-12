import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { userPointLogService } from "./userPointLog.service";

const Query = {
  getAllUserPointLog: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    set(args, "q.filter.userId", context.user.id.toString());
    return userPointLogService.fetch(args.q);
  },
  getOneUserPointLog: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await userPointLogService.findOne({ _id: id });
  },
};

const UserPointLog = {};

export default {
  Query,
  UserPointLog,
};
