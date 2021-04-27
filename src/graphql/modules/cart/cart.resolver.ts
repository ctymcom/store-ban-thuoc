import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { CartModel } from "./cart.model";

const Mutation = {
  updateCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    const cart = await CartModel.findOneAndUpdate(
      { userId: context.user.id.toString() },
      { $setOnInsert: { items: [] } },
      { new: true }
    );
    if (!cart) throw ErrorHelper.permissionDeny();
    cart.items = data.items;
    await cart.update({ $set: { items: data.items } });
    return await cart;
  },
};

const Cart = {};

export default {
  Mutation,
  Cart,
};
