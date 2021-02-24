import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { userAddressService } from "./userAddress.service";

const Query = {
  getAllUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    set(args, "q.filter.userId", context.user.id.toString());
    return userAddressService.fetch(args.q);
  },
  getOneUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await userAddressService.findOne({ _id: id });
  },
};

const Mutation = {
  createUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    return await userAddressService.create(data);
  },
  updateUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id, data } = args;
    return await userAddressService.updateOne(id, data);
  },
  deleteOneUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await userAddressService.deleteOne(id);
  },
};

const UserAddress = {};

export default {
  Query,
  Mutation,
  UserAddress,
};
