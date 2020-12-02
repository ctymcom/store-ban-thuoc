import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { orderItemService } from "./orderItem.service";

const Query = {
  getAllOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return orderItemService.fetch(args.q);
  },
  getOneOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await orderItemService.findOne({ _id: id });
  },
};

const Mutation = {
  createOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await orderItemService.create(data);
  },
  updateOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await orderItemService.updateOne(id, data);
  },
  deleteOneOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await orderItemService.deleteOne(id);
  },
  deleteManyOrderItem: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await orderItemService.deleteMany(ids);
    return result;
  },
};

const OrderItem = {
  
};

export default {
  Query,
  Mutation,
  OrderItem,
};
