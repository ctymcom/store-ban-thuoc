import { set } from "lodash";

import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { OrderModel } from "../order/order.model";
import { INotification } from "./notification.model";
import { notificationService } from "./notification.service";

const Query = {
  getAllNotification: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    set(args, "q.filter.userId", context.user.id);
    return notificationService.fetch(args.q);
  },
  getOneNotification: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await notificationService.findOne({ _id: id });
  },
};

const Notification = {
  link: async (root: INotification, args: any, context: Context) => {
    switch (root.controller) {
      case "ORDERS":
        return await OrderModel.findOne({
          code: parseInt(root.link),
          userId: context.user.id.toString(),
        }).then((res) => (res ? "/profile/order-details?id=" + res._id : "/profile/order-history"));
      default:
        root.link;
    }
  },
};

export default {
  Query,
  Notification,
};
