import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { UserAddressModel } from "../userAddress/userAddress.model";
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
        const cart = await CartModel.findOne({ userId: context.user.id.toString() });
        if (cart) return cart;
        const userAddress = await UserAddressModel.find({
          userId: context.user.id.toString(),
        }).then((res) => {
          const defaultAddress = res.find((a) => a.isDefault);
          if (defaultAddress) return defaultAddress;
          return res[0];
        });

        return await CartModel.create({
          userId: context.user.id.toString(),
          addressId: userAddress ? userAddress._id : null,
        });
      },
    },
  },
};
