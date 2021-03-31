import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Mutation {
      rateOrder(orderId: String!, reviewer: String!, imark: Int!, content: String!): String
    }
  `,
  resolver: {
    Mutation: {
      rateOrder: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { OrderId, Reviewer, Imark, Content } = args;
        const input = {
        type: "ORDER",
        code: OrderId,
        reviewer: Reviewer,
        imark: Imark,
        content: Content,
      };
      return AritoHelper.postComment(input, context.tokenData.ref);
      }
    },
  },
};
