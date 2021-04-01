import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { OrderModel } from "./order.model";

export default {
  schema: gql`
    extend type Mutation {
      completeOrder(orderId: ID!): String
    }
  `,
  resolver: {
    Mutation: {
      completeOrder: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { orderId } = args;
        const order = await OrderModel.findById(orderId);
        if (!order) {
          throw Error("Đơn hàng không tồn tại");
        }
        return AritoHelper.completeOrder(order.code.toString(), context.tokenData.ref);
      },
    },
  },
};
