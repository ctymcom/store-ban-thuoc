import { gql } from "apollo-server-express";

import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { CartModel } from "./cart.model";

export default {
  schema: gql`
    extend type Query {
      getUserCart: Cart
    }
  `,
  resolver: {
    Query: {
      getUserCart: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        return await CartModel.findOneAndUpdate(
          { userId: context.user.id.toString() },
          { $setOnInsert: { items: [] } },
          { upsert: true, new: true }
        );
      },
    },
  },
};
