import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { CustomerModel } from "./customer.model";

const Mutation = {
  customerGetMe: async (root: any, args: any, context: Context) => {
    context.auth([ROLES.CUSTOMER]);
    return await CustomerModel.findById(context.id);
  },
};

export default { Mutation };
