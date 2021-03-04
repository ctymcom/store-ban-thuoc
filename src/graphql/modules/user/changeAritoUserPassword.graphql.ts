import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Mutation {
      changeAritoUserPassword(oldPass: String!, newPass: String!): String
    }
  `,
  resolver: {
    Mutation: {
      changeAritoUserPassword: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { oldPass, newPass } = args;
        return await AritoHelper.changeUserPassword(oldPass, newPass, context.tokenData.ref);
      },
    },
  },
};
