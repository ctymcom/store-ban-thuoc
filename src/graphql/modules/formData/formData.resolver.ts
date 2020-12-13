import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { formDataService } from "./formData.service";
import { FormModel } from "../form/form.model";
import { ErrorHelper } from "../../../helpers/error.helper";
import { FormDataModel } from "./formData.model";

const Query = {
  getAllFormData: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return formDataService.fetch(args.q);
  },
};

const Mutation = {
  createFormData: async (root: any, args: any, context: Context) => {
    const { formId, data } = args.data;
    const form = await FormModel.findById(formId);
    if (!form) throw ErrorHelper.mgRecoredNotFound("Biểu mẫu");
    const formData = new FormDataModel({
      formId: formId,
      ua: context.ua,
      ip: context.ip,
      data,
    });
    return await formData.save();
  },
};

const FormData = {};

export default {
  Query,
  Mutation,
  FormData,
};
