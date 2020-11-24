import { IMember } from "./member.model";
import bcrypt from "bcrypt";

export class MemberHelper {
  constructor(public member: IMember) {}

  async setPassword(password: string) {
    return new Promise<MemberHelper>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        this.member.password = hash;
        resolve(this);
      });
    });
  }
  async verifyPassword(password: string) {
    return bcrypt.compare(password, this.member.password);
  }
  setActivedAt() {
    if (this.member.activated && !this.member.activedAt) {
      this.member.activedAt = new Date();
    }
    return this;
  }
}
