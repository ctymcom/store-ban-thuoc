import { gql } from "apollo-server-express";
import { get } from "lodash";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { AritoUser } from "../../../helpers/arito/types/aritoUser.type";
import { Context } from "../../context";
import { NotificationModel } from "../notification/notification.model";

export default {
  schema: gql`
    type AritoUser {
      id: Int
      username: String
      admin: Int
      nickname: String
      userRef: String
      unitId: Int
      imageId: String
      locationId: String
      devId: Int
      language: String
      country: String
      email: String
      phone: String
      birthday: DateTime
      datetime2: DateTime
      timeout: Int
      permission: Int
      group: String
      companyName: String
      companyType: Int

      imageLink: String
      thumbnailLink: String
      role: String
      point: Float
      unseenNotify: Int
    }
  `,
  resolver: {
    AritoUser: {
      imageLink: async (root: AritoUser, args: any, context: Context) => {
        return AritoHelper.getAvatarLink(root.imageId);
      },
      thumbnailLink: async (root: AritoUser, args: any, context: Context) => {
        return AritoHelper.getThumbnailLink(root.imageId);
      },
      point: async (root: AritoUser, args: any, context: Context) => {
        if (!get(context, "tokenData.ref")) return 0;
        return await AritoHelper.getUserPoint(context.tokenData.ref);
      },
      unseenNotify: async (root: AritoHelper, args: any, context: Context) => {
        if (!get(context, "tokenData.user")) return 0;
        return await NotificationModel.count({ userId: context.user.id, status: { $ne: 2 } });
      },
    },
  },
};
