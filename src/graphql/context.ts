import _, { get } from "lodash";
import { AuthHelper } from "../helpers";
import { TokenHelper } from "../helpers/token.helper";
import { TokenExpiredError } from "jsonwebtoken";
import { ROLES } from "../constants/role.const";
export type TokenData = {
  role: string;
  _id: string;
  [name: string]: string;
};
export class Context {
  constructor(
    public isAuth: boolean = false,
    public isTokenExpired: boolean = false,
    public tokenData?: TokenData
  ) {}

  isMember() {
    return get(this.tokenData, "role") == ROLES.MEMBER;
  }
  isCustomer() {
    return get(this.tokenData, "role") == ROLES.CUSTOMER;
  }
  get id() {
    return get(this.tokenData, "_id");
  }
}

export async function onContext(params: any) {
  const context: Context = new Context();
  try {
    const { req, connection } = params;
    let token;

    if (req) {
      token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
    }
    if (connection && connection.context) {
      token = connection.context["x-token"];
    }

    if (token) {
      const decodedToken: any = TokenHelper.decodeToken(token);
      context.isAuth = true;
      context.tokenData = decodedToken;
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      context.isTokenExpired = true;
    }
    context.isAuth = false;
  } finally {
    return context;
  }
}
