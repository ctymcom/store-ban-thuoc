import { IMember } from "./member.model";
import { TokenHelper } from "../../../helpers/token.helper";
import { ROLES } from "../../../constants/role.const";

export class MemberHelper {
  constructor(public member: IMember) {}

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
