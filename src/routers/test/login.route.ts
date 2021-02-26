import { Request, Response } from "express";
import { configs } from "../../configs";
export default [
  {
    method: "get",
    path: "/loginPhone",
    midd: [],
    action: async (req: Request, res: Response) => {
      res.render("loginPhone", { config: configs.firebaseView });
    },
  },
  {
    method: "get",
    path: "/loginEmail",
    midd: [],
    action: async (req: Request, res: Response) => {
      res.render("loginEmail", { config: configs.firebaseView });
    },
  },
];
