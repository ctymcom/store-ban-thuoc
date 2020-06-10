import moment from "moment";
import { configs } from "../configs";
import jwt from "jsonwebtoken";

export interface IPayloadToken {
  role_: string;
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
}
