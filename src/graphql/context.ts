import _ from "lodash";
import { AuthHelper } from "../helpers";
import { TokenHelper } from "../helpers/token.helper";
import { TokenExpiredError } from "jsonwebtoken";

export type Context = {
  isAuth: boolean;
  isTokenExpired: boolean;
  tokenData?: {
    role_: string;
    [name: string]: string;
  };
};

export async function onContext(params: any) {
  const context: Context = { isAuth: false, isTokenExpired: false };
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
