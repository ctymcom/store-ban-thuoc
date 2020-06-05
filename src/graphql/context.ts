import _ from "lodash";

export type Context = {
  isAuth: boolean;
};

export async function onContext(params: any) {
  const { req, connection } = params;
  const context: Context = { isAuth: false };
  let token;

  if (req) {
    token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
  }
  if (connection && connection.context) {
    token = connection.context["x-token"];
  }
  if (token) {
      
  }

  return context;
}
