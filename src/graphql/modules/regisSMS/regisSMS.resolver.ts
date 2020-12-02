import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CustomerLoader } from "../customer/customer.model";
import { MemberLoader } from "../member/member.model";
import { ProductLoader } from "../product/product.model";
import { RegisSMSHelper } from "./regisSMS.helper";
import { RegisSMSModel, RegisSMSStatus } from "./regisSMS.model";
import { regisSMSService } from "./regisSMS.service";

const Query = {
  getAllRegisSMS: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    if (context.isMember()) {
      set(args, "q.filter.sellerId", context.id);
    }
    if (context.isCustomer()) {
      set(args, "q.filter.registerId", context.id);
    }
    return regisSMSService.fetch(args.q);
  },
  getOneRegisSMS: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await regisSMSService.findOne({ _id: id });
  },
};

const Mutation = {
  createRegisSMS: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.CUSTOMER]);
    const { data } = args;
    const regis = new RegisSMSModel(data);
    // Xoá các đơn đăng ký cũ
    await RegisSMSModel.remove({
      registerId: context.id,
      status: RegisSMSStatus.PENDING,
      productId: regis.productId,
    }).exec();
    regis.code = await RegisSMSHelper.generateCode();
    return await regis.save();
  },
};

const RegisSMS = {
  seller: GraphQLHelper.loadById(MemberLoader, "sellerId"),
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
  register: GraphQLHelper.loadById(CustomerLoader, "registerId"),
};

export default {
  Query,
  Mutation,
  RegisSMS,
};
