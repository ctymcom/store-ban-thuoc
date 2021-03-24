import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { bankAccountService } from "./bankAccount.service";

const Query = {
  getAllBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    return bankAccountService.fetch(args.q);
  },
  getOneBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await bankAccountService.findOne({ _id: id });
  },
};

const Mutation = {
  createBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { data } = args;
    return await bankAccountService.create(data);
  },
  updateBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await bankAccountService.updateOne(id, data);
  },
  deleteOneBankAccount: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await bankAccountService.deleteOne(id);
  },
};

const BankAccount = {
  
};

export default {
  Query,
  Mutation,
  BankAccount,
};
