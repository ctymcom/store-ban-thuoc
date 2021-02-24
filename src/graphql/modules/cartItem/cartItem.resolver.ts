import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
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

const CartItem = {};

export default {
  Query,
  CartItem,
};
