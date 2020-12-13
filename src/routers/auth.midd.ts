import { NextFunction, Request, Response } from "express";
import { set } from "lodash";
import { Context } from "../graphql/context";
export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const context = new Context();
  context.parseToken({ req });
  set(req, "context", context);
  next();
}
