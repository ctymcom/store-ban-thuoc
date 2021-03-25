import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { bankAccountService } from "./bankAccount.service";

const Query = {
  getAllBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    return bankAccountService.fetch(args.q);
  },
  getOneBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await bankAccountService.findOne({ _id: id });
  },
};

const BankAccount = {};

export default {
  Query,
  BankAccount,
};
