import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { CustomerHelper } from "../customer/customer.helper";
import { MemberHelper } from "../member/member.helper";
import { customerPointLogService } from "./customerPointLog.service";

const Query = {
  getAllCustomerPointLog: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const customerHelper = await CustomerHelper.fromContext(context);
    if (customerHelper) {
      set(args, "q.filter.customerId", customerHelper.customer._id);
    }
    return customerPointLogService.fetch(args.q);
  },
};

const Mutation = {};

const CustomerPointLog = {};

export default {
  Query,
  Mutation,
  CustomerPointLog,
};
