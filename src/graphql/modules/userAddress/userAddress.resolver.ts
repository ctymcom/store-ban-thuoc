import { compact, set } from "lodash";

import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { AddressModel } from "../address/address.model";
import { UserAddressModel } from "./userAddress.model";
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
    const userId = context.user.id.toString();
    const addressData = await AddressModel.findOne({ wardId: data.wardId });
    if (!addressData) throw Error("Chưa chọn phường / xã.");
    data.fullAddress = compact([
      data.address,
      addressData.ward,
      addressData.district,
      addressData.province,
    ]).join(", ");
    const address = new UserAddressModel({
      userId: userId,
      ...data,
    });
    await AritoHelper.createUserAddress(address);
    await userAddressService.syncUserAddress(userId);
    return await UserAddressModel.findOne({ userId }).sort({ _id: -1 });
  },
  updateUserAddress: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id, data } = args;

    return await userAddressService.updateOne(id, data).then(async (res) => {
      await AritoHelper.updateUserAddress(res);
      return res;
    });
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
