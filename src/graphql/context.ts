import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _, { get } from "lodash";

import { ROLES } from "../constants/role.const";
import { AuthHelper } from "../helpers";
import { AritoUser } from "../helpers/arito/types/aritoUser.type";
import { TokenHelper } from "../helpers/token.helper";

export type TokenData = {
  role: string;
  _id: string;
  [name: string]: any;
};
export type SignedRequestPayload = {
  psid: string;
  algorithm: string;
  thread_type: string;
  tid: string;
  issued_at: number;
  page_id: number;
};
export class Context {
  req: Request;
  isAuth = false;
  isTokenExpired = false;
  tokenData: TokenData;
  constructor(params: { req?: Request; connection?: any }) {
    this.req = params.req;
    this.parseToken(params);
  }

  get isEditor() {
    return get(this.tokenData, "role") == ROLES.EDITOR;
  }
  isMember() {
    return get(this.tokenData, "role") == ROLES.MEMBER;
  }
  isCustomer() {
    return get(this.tokenData, "role") == ROLES.CUSTOMER;
  }
  isMessenger() {
    return get(this.tokenData, "role") == ROLES.MESSENGER;
  }
  get id() {
    return get(this.tokenData, "_id");
  }
  get ua() {
    return get(this, "req.headers.user-agent");
  }
  get ip() {
    return get(this, "req.headers.x-forwarded-for") || get(this, "req.headers.remoteAddress");
  }
  get user() {
    return get(this.tokenData, "user") as AritoUser;
  }
  parseToken(params: any) {
    try {
      const { req, connection } = params;
      let token;

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }
      if (connection && connection.context) {
        token = connection.context["x-token"];
      }

      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }
  auth(roles: string[]) {
    AuthHelper.acceptRoles(this, roles);
  }
}

export async function onContext(params: any) {
  return new Context(params);
}
