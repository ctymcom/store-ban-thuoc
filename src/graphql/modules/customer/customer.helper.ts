import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { CustomerModel, ICustomer } from "./customer.model";

export class CustomerHelper {
  constructor(public customer: ICustomer) {}

  static async fromContext(context: Context) {
    if (![ROLES.CUSTOMER].includes(context.tokenData.role)) return null;
    const member = await CustomerModel.findById(context.tokenData._id);
    if (!member) throw ErrorHelper.permissionDeny();
    return new CustomerHelper(member);
  }
}
