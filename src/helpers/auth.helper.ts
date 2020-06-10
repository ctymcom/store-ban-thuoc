import { Context } from "../graphql/context";
import { ErrorHelper } from "../base/error";

export class AuthHelper {
  constructor() {}

  static acceptRoles(context: Context, roles: String[]) {
    if (!context.isAuth) throw ErrorHelper.unauthorized();
    if (roles.indexOf(context.tokenData.role_) !== -1) {
      return;
    } else {
      if (context.isTokenExpired) throw ErrorHelper.tokenExpired();
      throw ErrorHelper.permissionDeny();
    }
  }
}
