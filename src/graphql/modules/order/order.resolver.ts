import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { orderService } from "./order.service";

const Query = {
  getAllOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return orderService.fetch(args.q);
  },
  getOneOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await orderService.findOne({ _id: id });
  },
};

const Mutation = {
  createOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await orderService.create(data);
  },
  updateOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await orderService.updateOne(id, data);
  },
  deleteOneOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await orderService.deleteOne(id);
  },
  deleteManyOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await orderService.deleteMany(ids);
    return result;
  },
};

const Order = {
  
};

export default {
  Query,
  Mutation,
  Order,
};