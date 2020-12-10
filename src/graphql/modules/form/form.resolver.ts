import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { formService } from "./form.service";

const Query = {
  getAllForm: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return formService.fetch(args.q);
  },
  getOneForm: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await formService.findOne({ _id: id });
  },
};

const Mutation = {
  createForm: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { data } = args;
    return await formService.create(data);
  },
  updateForm: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await formService.updateOne(id, data);
  },
  deleteOneForm: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await formService.deleteOne(id);
  },
};

const Form = {};

export default {
  Query,
  Mutation,
  Form,
};
