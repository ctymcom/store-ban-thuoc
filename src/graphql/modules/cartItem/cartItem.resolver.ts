import { ROLES } from "../../../constants/role.const";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { ProductLoader } from "../product/product.model";
import { cartItemService } from "./cartItem.service";

const Query = {
  getAllCartItem: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    return cartItemService.fetch(args.q);
  },
  getOneCartItem: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await cartItemService.findOne({ _id: id });
  },
};

const CartItem = {
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
};

export default {
  Query,
  CartItem,
};
