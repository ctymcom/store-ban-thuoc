import { keyBy, remove } from "lodash";
import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { ProductModel } from "../product/product.model";
import { CartModel } from "./cart.model";

const Mutation = {
  updateCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    const cart = await CartModel.findOneAndUpdate(
      { userId: context.user.id.toString() },
      { $setOnInsert: { items: [] } }
    );
    if (!cart) throw ErrorHelper.permissionDeny();
    cart.items = data.items;
    cart.markModified("items");
    return await cart.save().catch(async (err) => {
      const products = await ProductModel.find({
        _id: { $in: cart.items.map((i) => i.productId) },
      }).then((res) => keyBy(res, "_id"));
      remove(cart.items, (i) => !products[i.productId]);
      cart.markModified("items");
      return await cart.save();
    });
  },
};

const Cart = {};

export default {
  Mutation,
  Cart,
};
