import { token } from "morgan";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { TokenHelper } from "../../../helpers/token.helper";
import { Context } from "../../context";
import { userAddressService } from "../userAddress/userAddress.service";
import { UserModel } from "./user.model";

const Mutation = {
  userUpdateMe: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    const user = await AritoHelper.updateUserProfile(
      { ...context.user, ...data },
      context.tokenData.ref
    );
    let userData: any;
    if (user.permission == 3) {
      userData = { ...user, role: ROLES.EDITOR };
    } else {
      userData = { ...user, role: ROLES.CUSTOMER };
    }
    await userAddressService.syncUserAddress(userData.id.toString());

    return {
      token: TokenHelper.getAritorUserToken(userData, context.tokenData.ref, userData.role),
      user: userData,
    };
    return;
  },
};

export default {
  Mutation,
};
