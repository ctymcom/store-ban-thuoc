import { keyBy } from "lodash";

import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { ProductModel } from "../product/product.model";
import { UserAddressLoader } from "../userAddress/userAddress.model";
import { CartModel } from "./cart.model";
import { CartItem } from "./types/cartItem.type";

const Mutation = {
  updateCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    const cart = await CartModel.findOne({ userId: context.user.id.toString() });
    if (!cart) throw ErrorHelper.permissionDeny();
    if (data.items) {
      cart.itemCount = 0;
      cart.subtotal = 0;
      cart.shipfee = 0;
      cart.discount = 0;
      cart.amount = 0;
      cart.items = [];
      const products = await ProductModel.find({
        _id: data.items.map((i) => i.productId),
      }).then((res) => keyBy(res, "_id"));
      data.items.forEach((i) => {
        const product = products[i.productId];
        if (!product) return;
        let price = product.salePrice;
        if (context.user.group && context.user.group != "") {
          const groupPrice = product.priceGroups.find((p) => p.customerGroup == context.user.group);
          if (groupPrice) {
            price = groupPrice.salePrice;
          }
        }
        const item: CartItem = {
          userId: cart.userId,
          productId: product._id,
          productCode: product.code,
          unit: product.unitCode,
          qty: i.qty,
          price: price,
          amount: price * i.qty,
        };
        cart.items.push(item);
        cart.itemCount += item.qty;
        cart.subtotal += item.amount;
      });
    }
    cart.amount = cart.subtotal + cart.shipfee - cart.discount;
    return await cart.save();
  },
};

const Cart = {
  address: GraphQLHelper.loadById(UserAddressLoader, "addressId"),
};

export default {
  Mutation,
  Cart,
};
