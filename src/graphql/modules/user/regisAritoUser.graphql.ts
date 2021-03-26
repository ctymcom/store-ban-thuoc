import { gql } from "apollo-server-express";
import { get, set } from "lodash";

import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { TokenHelper } from "../../../helpers/token.helper";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Mutation {
      regisAritoUser(
        nickname: String!
        email: String!
        phone: String!
        password: String!
        birthday: DateTime!
        companyType: String!
        companyName: String!
        deviceId: String
        deviceToken: String
      ): LoginAritoData
    }
  `,
  resolver: {
    Mutation: {
      regisAritoUser: async (root: any, args: any, context: Context) => {
        const {
          nickname,
          email,
          phone,
          password,
          birthday,
          companyType,
          companyName,
          deviceId,
          deviceToken,
        } = args;
        const deviceModel = get(context.req, "headers.x-d-model", "");
        const deviceBrand = get(context.req, "headers.x-d-brand", "");
        const deviceName = get(context.req, "headers.x-d-name", "");
        const deviceOsVersion = get(context.req, "headers.x-d-os", "");
        const { token, user } = await AritoHelper.register({
          nickname,
          email,
          phone,
          password,
          birthday,
          companyName,
          companyType,
          deviceId,
          deviceToken,
          deviceModel,
          deviceBrand,
          deviceName,
          deviceOsVersion,
        });
        let userData: any;
        if (user.permission >= 3) {
          userData = { ...user, role: ROLES.EDITOR };
        } else {
          userData = { ...user, role: ROLES.CUSTOMER };
        }
        set(context, "tokenData.ref", token);
        return {
          token: TokenHelper.getAritorUserToken(userData, token, userData.role),
          user: userData,
        };
      },
    },
  },
};
