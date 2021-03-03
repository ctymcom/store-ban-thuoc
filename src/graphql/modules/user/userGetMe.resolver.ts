import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { UserModel } from "./user.model";

const Query = {
  userGetMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    return await AritoHelper.getUserProfile(context.tokenData.ref);
  },
};

export default {
  Query,
};
