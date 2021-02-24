import { ROLES } from "../../../constants/role.const";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CartItemLoader } from "../cartItem/cartItem.model";
import { UserAddressLoader } from "../userAddress/userAddress.model";
import { cartService } from "./cart.service";

const Query = {
  getAllCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    return cartService.fetch(args.q);
  },
  getOneCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await cartService.findOne({ _id: id });
  },
};

const Mutation = {
  createCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { data } = args;
    return await cartService.create(data);
  },
  updateCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await cartService.updateOne(id, data);
  },
  deleteOneCart: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await cartService.deleteOne(id);
  },
};

const Cart = {
  address: GraphQLHelper.loadById(UserAddressLoader, "addressId"),
  items: GraphQLHelper.loadManyById(CartItemLoader, "itemIds"),
};

export default {
  Query,
  Mutation,
  Cart,
};
