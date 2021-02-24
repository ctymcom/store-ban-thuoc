import { gql } from "apollo-server-express";
import { get } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { TokenHelper } from "../../../helpers/token.helper";
import { Context } from "../../context";
import { UserAddressModel } from "../userAddress/userAddress.model";

export default {
  schema: gql`
    extend type Mutation {
      loginAritoUser(
        username: String!
        password: String!
        deviceId: String
        deviceToken: String
      ): LoginAritoData
    }
  `,
  resolver: {
    Mutation: {
      loginAritoUser: async (root: any, args: any, context: Context) => {
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
        let userData: any;
        if (user.permission == 3) {
          userData = { ...user, role: ROLES.EDITOR };
        } else {
          userData = { ...user, role: ROLES.CUSTOMER };
        }
        await AritoHelper.getUserAddress(userData.id.toString()).then(async (res) => {
          const addressBulk = UserAddressModel.collection.initializeUnorderedBulkOp();
          res.data.forEach((d) => {
            addressBulk
              .find({ addressId: d.addressId, userId: userData.id.toString() })
              .upsert()
              .updateOne({ $set: d });
          });
          if (addressBulk.length > 0) return await addressBulk.execute();
        });
        return {
          token: TokenHelper.getAritorUserToken(userData, token, userData.role),
          user: userData,
        };
      },
    },
  },
};
