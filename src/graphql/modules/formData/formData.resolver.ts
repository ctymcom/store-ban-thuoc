import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { formDataService } from "./formData.service";

const Query = {
  getAllFormData: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return formDataService.fetch(args.q);
  },
};

const FormData = {};

export default {
  Query,
  FormData,
};
