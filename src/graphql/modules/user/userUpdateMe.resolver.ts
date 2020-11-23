import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { UserModel } from "./user.model";

const Mutation = {
  userUpdateMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { data } = args;
    return await UserModel.findByIdAndUpdate(context.tokenData._id, { $set: data }, { new: true });
  },
};

export default {
  Mutation,
};
