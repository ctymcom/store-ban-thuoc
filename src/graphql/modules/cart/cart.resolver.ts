import { keyBy } from "lodash";

import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CartItemLoader, CartItemModel, ICartItem } from "../cartItem/cartItem.model";
import { ProductModel } from "../product/product.model";
import { UserAddressLoader } from "../userAddress/userAddress.model";
import { CartModel } from "./cart.model";

const Mutation = {
  updateCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id, data } = args;
    const cart = await CartModel.findOne({ userId: context.user.id.toString() });
    if (!cart || cart._id.toString() != id) throw ErrorHelper.permissionDeny();
    let items: ICartItem[] = [];
    if (data.items) {
      cart.itemCount = 0;
      cart.subtotal = 0;
      cart.shipfee = 0;
      cart.discount = 0;
      cart.amount = 0;
      cart.itemIds = [];
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
        const item = new CartItemModel({
          cartId: cart._id,
          userId: cart.userId,
          productId: product._id,
          productCode: product.code,
          unit: product.unitCode,
          qty: i.qty,
          price: price,
          amount: price * i.qty,
        });
        items.push(item);
        cart.itemCount += item.qty;
        cart.subtotal += item.amount;
        cart.itemIds.push(item._id);
      });
      await CartItemModel.remove({ cartId: cart._id });
      if (items.length > 0) {
        await CartItemModel.insertMany(items);
      }
    } else {
      items = await CartItemModel.find({ _id: { $in: cart.itemIds } });
    }

    // cart.discount = draftOrder.discount;
    // cart.subtotal = draftOrder.subtotal;
    // cart.amount = draftOrder.amount;
    return await cart.save();
  },
};

const Cart = {
  address: GraphQLHelper.loadById(UserAddressLoader, "addressId"),
  items: GraphQLHelper.loadManyById(CartItemLoader, "itemIds"),
};

export default {
  Mutation,
  Cart,
};
