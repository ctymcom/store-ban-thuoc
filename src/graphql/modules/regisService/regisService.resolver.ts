import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { AddressHelper } from "../address/address.helper";
import { CustomerLoader } from "../customer/customer.model";
import { MemberLoader } from "../member/member.model";
import { ProductLoader } from "../product/product.model";
import { RegisServiceHelper } from "./regisService.helper";
import { RegisServiceModel, RegisServiceStatus } from "./regisService.model";
import { regisServiceService } from "./regisService.service";

const Query = {
  getAllRegisService: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    if (context.isMember()) {
      set(args, "q.filter.sellerId", context.id);
    }
    if (context.isCustomer()) {
      set(args, "q.filter.registerId", context.id);
    }
    return regisServiceService.fetch(args.q);
  },
  getOneRegisService: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await regisServiceService.findOne({ _id: id });
  },
};

const Mutation = {
  createRegisService: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.CUSTOMER]);
    const { data } = args;
    const regis = new RegisServiceModel(data);
    // Xoá các đơn đăng ký cũ
    await RegisServiceModel.remove({
      registerId: context.id,
      status: RegisServiceStatus.PENDING,
      productId: regis.productId,
    }).exec();
    regis.code = await RegisServiceHelper.generateCode();
    await Promise.all([
      AddressHelper.setProvinceName(regis),
      AddressHelper.setDistrictName(regis),
      AddressHelper.setWardName(regis),
    ]);
    return await regis.save();
  },
};

const RegisService = {
  seller: GraphQLHelper.loadById(MemberLoader, "sellerId"),
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
  register: GraphQLHelper.loadById(CustomerLoader, "registerId"),
};

export default {
  Query,
  Mutation,
  RegisService,
};
