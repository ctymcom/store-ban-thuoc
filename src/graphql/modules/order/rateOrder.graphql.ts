import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { OrderModel } from "./order.model";

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
        const { orderId, reviewer, imark, content } = args;
        let order = await OrderModel.find({code:orderId})
        if (!order && order.length ==0){
          throw new Error("Không tồn tại đơn hàng")
        }
        const input = {
        type: "ORDER",
        code: orderId.code,
        reviewer: reviewer,
        imark: imark,
        content: content,
      };
      return AritoHelper.postComment(input, context.tokenData.ref);
      }
    },
  },
};
