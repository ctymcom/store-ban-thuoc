import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { NotificationModel } from "./notification.model";

export default {
  schema: gql`
    extend type Mutation {
      markNotifyAsRead(notifyId: ID!): String
    }
  `,
  resolver: {
    Mutation: {
      markNotifyAsRead: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { notifyId } = args;
        const notification = await NotificationModel.findById(notifyId);
        if (!notification) return "ok";
        return await AritoHelper.markAsReadMessage(
          { notifyId: notification.code, userId: context.user.id },
          context.tokenData.ref
        ).then(async (res) => {
          notification.status = 2;
          await notification.save();
          return res;
        });
      },
    },
  },
};
