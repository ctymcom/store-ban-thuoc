import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { FormModel, IForm } from "./form.model";
import { formService } from "./form.service";
import { FormHelper } from "./form.helper";

const Query = {
  getAllForm: async (root: any, args: any, context: Context) => {
    // AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
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
    const form = new FormModel(data);
    if (!form.code) form.code = await formService.generateCode();
    return await form.save();
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

const Form = {
  submitLink: async (root: IForm, args: any, context: Context) => {
    return new FormHelper(root).getSubmitLink();
  },
};

export default {
  Query,
  Mutation,
  Form,
};
