import { configs } from "../configs";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/role.const";
import { AritoUser } from "./arito/types/aritoUser.type";

export interface IPayloadToken {
  role: string;
  [name: string]: any;
}

export class TokenHelper {
  constructor() {}

  static generateToken(payload: IPayloadToken): string {
    return jwt.sign(payload, configs.secretKey, { expiresIn: "30d" });
  }

  static decodeToken(token: string) {
    return jwt.verify(token, configs.secretKey);
  }

  static getAdministratorToken() {
    return this.generateToken({
      role: ROLES.ADMIN,
    });
  }
  static getAritorEditorToken(user: AritoUser, token: string) {
    return this.generateToken({
      role: ROLES.EDITOR,
      user: user,
      ref: token,
    });
  }
  static getAritorUserToken(user: AritoUser, token: string, role: string) {
    return this.generateToken({
      role: role,
      user: user,
      ref: token,
    });
  }
}
