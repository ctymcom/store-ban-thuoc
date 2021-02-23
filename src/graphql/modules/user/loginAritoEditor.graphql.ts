import { gql } from "apollo-server-express";
import { get } from "lodash";
import { Context } from "../../context";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { TokenHelper } from "../../../helpers/token.helper";
import { AritoUser } from "../../../helpers/arito/types/aritoUser.type";
import { ROLES } from "../../../constants/role.const";
import { ErrorHelper } from "../../../helpers";

export default {
  schema: gql`
    extend type Mutation {
      loginAritoEditor(
        username: String!
        password: String!
        deviceId: String
        deviceToken: String
      ): LoginAritoData
    }
    type LoginAritoData {
      token: String
      user: AritoUser
    }
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

      imageLink: String
      role: String
    }
  `,
  resolver: {
    Mutation: {
      loginAritoEditor: async (root: any, args: any, context: Context) => {
        const { username, password, deviceId, deviceToken } = args;
        const deviceModel = get(context.req, "headers.x-d-model", "");
        const deviceBrand = get(context.req, "headers.x-d-brand", "");
        const deviceName = get(context.req, "headers.x-d-name", "");
        const deviceOsVersion = get(context.req, "headers.x-d-os", "");
        const { token, user } = await AritoHelper.login({
          username,
          password,
          deviceId,
          deviceToken,
          deviceModel,
          deviceBrand,
          deviceName,
          deviceOsVersion,
        });
        if (user.permission != 3) throw ErrorHelper.permissionDeny();
        const userData = { ...user, role: ROLES.EDITOR };
        const editorToken = TokenHelper.getAritorEditorToken(userData, token);
        return {
          token: editorToken,
          user: userData,
        };
      },
    },
    AritoUser: {
      imageLink: async (root: AritoUser, args: any, context: Context) => {
        return AritoHelper.getImageLink(root.imageId);
      },
    },
  },
};
