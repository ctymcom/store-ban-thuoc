import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CustomerLoader } from "../customer/customer.model";
import { MemberLoader } from "../member/member.model";
import { OrderItemLoader } from "../orderItem/orderItem.model";
import { UserLoader } from "../user/user.model";
import { orderService } from "./order.service";

const Query = {
  getAllOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    if (context.isMember()) {
      set(args, "q.filter.sellerId", context.id);
    }
    if (context.isCustomer()) {
      set(args, "q.filter.buyerId", context.id);
    }
    return orderService.fetch(args.q);
  },
  getOneOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await orderService.findOne({ _id: id });
  },
};

const Mutation = {
  createOrder: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.CUSTOMER]);
    const { data } = args;
    return await orderService.create(data);
  },
};

const Order = {
  items: GraphQLHelper.loadManyById(OrderItemLoader, "itemIds"),
  seller: GraphQLHelper.loadById(MemberLoader, "sellerId"),
  updatedByUser: GraphQLHelper.loadById(UserLoader, "updatedByUserId"),
  buyer: GraphQLHelper.loadById(CustomerLoader, "buyerId"),
};

export default {
  Query,
  Mutation,
  Order,
};
