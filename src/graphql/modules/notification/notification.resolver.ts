import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { notificationService } from "./notification.service";

const Query = {
  getAllNotification: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    set(args, "q.filter.userId", context.user.id.toString());
    return notificationService.fetch(args.q);
  },
  getOneNotification: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await notificationService.findOne({ _id: id });
  },
};

const Notification = {};

export default {
  Query,
  Notification,
};
