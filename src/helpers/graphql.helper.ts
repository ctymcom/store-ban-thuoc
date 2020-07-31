import { AuthHelper } from "./auth.helper";
import { Context } from "../graphql/context";

export class GraphQLHelper {
  static loadById(loader: any, idField: string) {
    return (root: any, args: any, context: Context) => {
      return root[idField] ? loader.load(root[idField].toString()) : undefined;
    };
  }
  static loadManyById(loader: any, idField: string) {
    return (root: any, args: any, context: Context) => {
      return root[idField] ? loader.loadMany(root[idField]) : undefined;
    };
  }
  static requireRoles(roles: string[]) {
    return (root: any, args: any, context: Context, info: any) => {
      AuthHelper.acceptRoles(context, roles);
      return root[info.fieldName];
    };
  }
}
