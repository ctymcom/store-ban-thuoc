import { IMember, MemberModel } from "./member.model";
import { TokenHelper } from "../../../helpers/token.helper";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { ErrorHelper } from "../../../base/error";

export class MemberHelper {
  constructor(public member: IMember) {}

  static async fromContext(context: Context) {
    if (![ROLES.MEMBER].includes(context.tokenData.role)) return null;
    const member = await MemberModel.findById(context.tokenData._id);
    if (!member) throw ErrorHelper.permissionDeny();
    return new MemberHelper(member);
  }

  setActivedAt() {
    if (this.member.activated && !this.member.activedAt) {
      this.member.activedAt = new Date();
    }
    return this;
  }

  getToken() {
    return TokenHelper.generateToken({
      role: ROLES.MEMBER,
      _id: this.member._id,
      username: this.member.name || this.member.username,
    });
  }
}
