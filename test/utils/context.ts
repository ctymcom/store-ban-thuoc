import { ROLES } from "../../src/constants/role.const";
import { Context } from "../../src/graphql/context";

export function getAdminContext() {
  let context: Context = {
    isAuth: true,
    isTokenExpired: false,
    tokenData: {
      role_: ROLES.ADMIN,
    },
  };

  return context;
}

export function getSampleContext(){
  let context: Context = {
    isAuth: false,
    isTokenExpired: false
  };

  return context;
}