import { BaseRoute, Request, Response, NextFunction } from "../../base/baseRoute";
import { ErrorHelper } from "../../base/error";
class ExampleRoute extends BaseRoute {
  constructor() {
    super();
  }

  customRouting() {
    this.router.get("/", this.route(this.index));
  }

  async index(req: Request, res: Response) {
    this.response(res, [
      {
        id: 1,
        data: "data",
      },
      {
        id: 2,
        data: "data",
      },
      {
        id: 3,
        data: "data",
      },
      {
        id: 4,
        data: "data",
      },
    ]);
  }
}

export default new ExampleRoute().router;
